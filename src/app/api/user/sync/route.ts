import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase/server';

// GET: Fast path — check if user exists in Supabase (no Clerk API call)
export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let supabase;
    try {
      supabase = createAdminSupabaseClient();
    } catch {
      return NextResponse.json({ exists: false, userId, reason: 'no_admin_client' });
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('id, clerk_id, email, first_name, last_name, avatar_url, role, status')
      .eq('clerk_id', userId)
      .maybeSingle();

    if (error || !user) {
      return NextResponse.json({ exists: false, userId });
    }

    return NextResponse.json({ exists: true, user });
  } catch (error) {
    console.error('Sync GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST: Full sync — creates or links user in Supabase using Clerk data
export async function POST() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let supabase;
    try {
      supabase = createAdminSupabaseClient();
    } catch (e) {
      console.error('Admin client unavailable for sync:', e);
      return NextResponse.json({ error: 'Service temporarily unavailable', fallback: true }, { status: 503 });
    }

    // Step 1: Check if user already exists by clerk_id (fast, no Clerk API call)
    const { data: existingByClerkId } = await supabase
      .from('users')
      .select('id, clerk_id, email, first_name, last_name, avatar_url, role, status')
      .eq('clerk_id', userId)
      .maybeSingle();

    if (existingByClerkId) {
      // User exists — return immediately without UPDATE
      // Webhook handles profile updates, no need to update on every login
      return NextResponse.json({ message: 'User exists', userId, user: existingByClerkId });
    }

    // Step 2: User not found — need Clerk data to create/link
    // This is the only code path that calls currentUser() (slow but necessary)
    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'User not found in Clerk' }, { status: 404 });
    }

    const primaryEmail = user.emailAddresses[0]?.emailAddress;

    // Step 3: Check by email (webhook may have created with different timing)
    if (primaryEmail) {
      const { data: existingByEmail } = await supabase
        .from('users')
        .select('id, clerk_id, email, first_name, last_name, avatar_url, role, status')
        .eq('email', primaryEmail)
        .maybeSingle();

      if (existingByEmail) {
        // Link this clerk_id to existing email row
        const { data: updated, error: updateErr } = await supabase
          .from('users')
          .update({
            clerk_id: userId,
            first_name: user.firstName || existingByEmail.first_name,
            last_name: user.lastName || existingByEmail.last_name,
            avatar_url: user.imageUrl || existingByEmail.avatar_url,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingByEmail.id)
          .select('id, clerk_id, email, first_name, last_name, avatar_url, role, status')
          .single();

        if (updateErr) {
          console.error('Error linking user by email:', updateErr);
          return NextResponse.json({ error: 'Error linking user' }, { status: 500 });
        }

        return NextResponse.json({ message: 'User linked', userId, user: updated });
      }
    }

    // Step 4: Create new user
    const { data: created, error: insertErr } = await supabase
      .from('users')
      .insert({
        clerk_id: userId,
        email: primaryEmail,
        first_name: user.firstName || null,
        last_name: user.lastName || null,
        avatar_url: user.imageUrl || null,
        role: 'user',
        status: 'active',
        notifications_email: true,
        notifications_messages: true,
        notifications_updates: true,
      })
      .select('id, clerk_id, email, first_name, last_name, avatar_url, role, status')
      .single();

    if (insertErr) {
      // Race condition: webhook inserted between our check and insert
      // Try to find the user one more time by clerk_id or email
      const { data: raceUser } = await supabase
        .from('users')
        .select('id, clerk_id, email, first_name, last_name, avatar_url, role, status')
        .or(`clerk_id.eq.${userId}${primaryEmail ? `,email.eq.${primaryEmail}` : ''}`)
        .maybeSingle();

      if (raceUser) {
        // If found by email but clerk_id doesn't match, link it
        if (raceUser.clerk_id !== userId) {
          await supabase
            .from('users')
            .update({ clerk_id: userId, updated_at: new Date().toISOString() })
            .eq('id', raceUser.id);
          raceUser.clerk_id = userId;
        }
        return NextResponse.json({ message: 'User found after race', userId, user: raceUser });
      }

      console.error('Error creating user:', insertErr);
      return NextResponse.json({ error: 'Error creating user', details: insertErr.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'User created', userId, user: created });
  } catch (error) {
    console.error('Sync POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { createAdminSupabaseClient, createServerSupabaseClient } from '@/lib/supabase/server';

export async function POST() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await currentUser();
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    let supabase;
    try {
      supabase = createAdminSupabaseClient();
    } catch (e) {
      console.error('Admin client unavailable for sync:', e);
      return NextResponse.json({ error: 'Service temporarily unavailable', fallback: true }, { status: 503 });
    }

    const primaryEmail = user.emailAddresses[0]?.emailAddress;

    // Atomic upsert: handles race condition with webhook
    // Try to find by clerk_id first, then by email (webhook may have created with different clerk_id)
    const { data: existingByClerkId } = await supabase
      .from('users')
      .select('*')
      .eq('clerk_id', userId)
      .maybeSingle();

    if (existingByClerkId) {
      // User found by clerk_id — update and return
      const { data: updated, error } = await supabase
        .from('users')
        .update({
          email: primaryEmail,
          first_name: user.firstName || null,
          last_name: user.lastName || null,
          avatar_url: user.imageUrl || null,
          updated_at: new Date().toISOString(),
        })
        .eq('clerk_id', userId)
        .select('*')
        .single();

      if (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ error: 'Error updating user' }, { status: 500 });
      }

      return NextResponse.json({ message: 'User updated', userId, user: updated });
    }

    // Check by email (webhook may have created the row before this runs)
    if (primaryEmail) {
      const { data: existingByEmail } = await supabase
        .from('users')
        .select('*')
        .eq('email', primaryEmail)
        .maybeSingle();

      if (existingByEmail) {
        // Link this clerk_id to existing email row
        const { data: updated, error } = await supabase
          .from('users')
          .update({
            clerk_id: userId,
            first_name: user.firstName || null,
            last_name: user.lastName || null,
            avatar_url: user.imageUrl || null,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingByEmail.id)
          .select('*')
          .single();

        if (error) {
          console.error('Error linking user by email:', error);
          return NextResponse.json({ error: 'Error linking user' }, { status: 500 });
        }

        return NextResponse.json({ message: 'User linked', userId, user: updated });
      }
    }

    // Create new user
    const { data: created, error } = await supabase
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
      .select('*')
      .single();

    if (error) {
      // Race condition: webhook inserted between our check and insert
      // Try one more time to find the user
      const { data: raceUser } = await supabase
        .from('users')
        .select('*')
        .eq('clerk_id', userId)
        .maybeSingle();

      if (raceUser) {
        return NextResponse.json({ message: 'User found after race', userId, user: raceUser });
      }

      console.error('Error creating user:', error);
      return NextResponse.json({ error: 'Error creating user', details: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'User created', userId, user: created });
  } catch (error) {
    console.error('Sync POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Use server client (not admin) - users table has SELECT USING (true) policy
    const supabase = await createServerSupabaseClient();

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('clerk_id', userId)
      .single();

    if (error || !user) {
      return NextResponse.json({ exists: false, userId });
    }

    return NextResponse.json({ exists: true, user });
  } catch (error) {
    console.error('Sync GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

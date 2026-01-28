import { auth, currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase/server';

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

    const supabase = createAdminSupabaseClient();
    const primaryEmail = user.emailAddresses[0]?.emailAddress;

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('clerk_id', userId)
      .single();

    if (existingUser) {
      // Update existing user
      const { error } = await supabase
        .from('users')
        .update({
          email: primaryEmail,
          first_name: user.firstName || null,
          last_name: user.lastName || null,
          avatar_url: user.imageUrl || null,
          updated_at: new Date().toISOString(),
        })
        .eq('clerk_id', userId);

      if (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ error: 'Error updating user' }, { status: 500 });
      }

      return NextResponse.json({ message: 'User updated', userId });
    }

    // Create new user with full access
    const { error } = await supabase.from('users').insert({
      clerk_id: userId,
      email: primaryEmail,
      first_name: user.firstName || null,
      last_name: user.lastName || null,
      avatar_url: user.imageUrl || null,
      role: 'user',
      status: 'active',
      features_unlocked: true,
      notifications_email: true,
      notifications_messages: true,
      notifications_updates: true,
    });

    if (error) {
      console.error('Error creating user:', error);
      return NextResponse.json({ error: 'Error creating user', details: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'User created', userId });
  } catch (error) {
    console.error('Sync error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createAdminSupabaseClient();

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
    console.error('Check error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

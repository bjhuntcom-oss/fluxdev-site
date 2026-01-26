import { NextRequest, NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId: currentUserId } = await auth();
    
    if (!currentUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = await createServerSupabaseClient();
    
    // Check if current user is admin
    const { data: currentUser } = await supabase
      .from('users')
      .select('role')
      .eq('clerk_id', currentUserId)
      .single();

    if (!currentUser || currentUser.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { userId } = await params;
    const body = await req.json();
    const { role, status, features_unlocked } = body;

    // Get the user's clerk_id from Supabase
    const { data: targetUser } = await supabase
      .from('users')
      .select('clerk_id')
      .eq('id', userId)
      .single();

    if (!targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Update Supabase
    const updateData: Record<string, unknown> = {};
    if (role !== undefined) updateData.role = role;
    if (status !== undefined) updateData.status = status;
    if (features_unlocked !== undefined) updateData.features_unlocked = features_unlocked;

    const { error: supabaseError } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', userId);

    if (supabaseError) {
      console.error('Supabase update error:', supabaseError);
      return NextResponse.json({ error: 'Failed to update user in database' }, { status: 500 });
    }

    // Sync metadata to Clerk
    const clerk = await clerkClient();
    const clerkMetadata: Record<string, unknown> = {};
    if (role !== undefined) clerkMetadata.role = role;
    if (status !== undefined) clerkMetadata.status = status;
    if (features_unlocked !== undefined) clerkMetadata.features_unlocked = features_unlocked;

    await clerk.users.updateUserMetadata(targetUser.clerk_id, {
      publicMetadata: clerkMetadata,
    });

    // Log the action
    await supabase.from('audit_logs').insert({
      user_id: userId,
      action: 'user_updated',
      entity_type: 'user',
      entity_id: userId,
      new_values: updateData,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId: currentUserId } = await auth();
    
    if (!currentUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = await createServerSupabaseClient();
    
    // Check if current user is admin or staff
    const { data: currentUser } = await supabase
      .from('users')
      .select('role')
      .eq('clerk_id', currentUserId)
      .single();

    if (!currentUser || !['admin', 'staff'].includes(currentUser.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { userId } = await params;

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

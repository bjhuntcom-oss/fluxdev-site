import { NextRequest, NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { createAdminSupabaseClient } from '@/lib/supabase/server';

const VALID_ROLES = ['user', 'staff', 'dev', 'admin'] as const;
const VALID_STATUSES = ['pending', 'active', 'suspended', 'banned'] as const;

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId: currentUserId } = await auth();
    
    if (!currentUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createAdminSupabaseClient();
    
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

    // Validate role if provided
    if (role !== undefined && !VALID_ROLES.includes(role)) {
      return NextResponse.json({ error: `Invalid role. Must be one of: ${VALID_ROLES.join(', ')}` }, { status: 400 });
    }

    // Validate status if provided
    if (status !== undefined && !VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` }, { status: 400 });
    }

    // Get the target user's current data for audit
    const { data: targetUser } = await supabase
      .from('users')
      .select('clerk_id, role, status, features_unlocked')
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

    // Log the action with old values
    const oldValues: Record<string, unknown> = {};
    if (role !== undefined) oldValues.role = targetUser.role;
    if (status !== undefined) oldValues.status = targetUser.status;
    if (features_unlocked !== undefined) oldValues.features_unlocked = targetUser.features_unlocked;

    await supabase.from('audit_logs').insert({
      user_id: userId,
      action: role !== undefined ? 'role_changed' : status !== undefined ? 'status_changed' : 'user_updated',
      entity_type: 'user',
      entity_id: userId,
      old_values: oldValues,
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

    const supabase = createAdminSupabaseClient();
    
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

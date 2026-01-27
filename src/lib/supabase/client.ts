import { createBrowserClient } from '@supabase/ssr';

// Supabase client
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Store current clerk_id for RLS
let currentClerkId: string | null = null;
let isClerkIdSet = false;

// Initialize clerk_id for RLS - call this once when user is loaded
export async function initClerkId(clerkId: string | null) {
  if (clerkId && clerkId !== currentClerkId) {
    currentClerkId = clerkId;
    isClerkIdSet = false;
  }
}

// Ensure clerk_id is set in session before queries
export async function ensureClerkId() {
  if (currentClerkId && !isClerkIdSet) {
    await supabase.rpc('set_clerk_id', { clerk_id: currentClerkId });
    isClerkIdSet = true;
  }
}

// Get current clerk_id
export function getClerkId() {
  return currentClerkId;
}

// Helper to create a query with clerk_id set
export async function queryWithAuth<T>(
  queryFn: () => Promise<T>
): Promise<T> {
  await ensureClerkId();
  return queryFn();
}

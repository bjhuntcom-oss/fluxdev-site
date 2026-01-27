import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Store current clerk_id for RLS
let currentClerkId: string | null = null;
let supabaseInstance: SupabaseClient | null = null;

// Create Supabase client with clerk_id header
function createSupabaseClient(): SupabaseClient {
  const headers: Record<string, string> = {};
  if (currentClerkId) {
    headers['x-clerk-id'] = currentClerkId;
  }
  
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers
      }
    }
  );
}

// Getter that always returns current client
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    if (!supabaseInstance) {
      supabaseInstance = createSupabaseClient();
    }
    return (supabaseInstance as any)[prop];
  }
});

// Initialize clerk_id for RLS - recreates client with new header
export function initClerkId(clerkId: string | null) {
  if (clerkId && clerkId !== currentClerkId) {
    currentClerkId = clerkId;
    supabaseInstance = createSupabaseClient();
  }
}

// No-op for compatibility
export async function ensureClerkId() {}

// Get current clerk_id
export function getClerkId() {
  return currentClerkId;
}

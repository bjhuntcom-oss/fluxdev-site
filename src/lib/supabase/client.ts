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
    return Reflect.get(supabaseInstance!, prop);
  }
});

// Initialize clerk_id for RLS - recreates client with new header
export function initClerkId(clerkId: string | null) {
  if (clerkId && clerkId !== currentClerkId) {
    currentClerkId = clerkId;
    supabaseInstance = createSupabaseClient();
  }
}

// Ensure clerk_id is set - accepts optional clerkId to initialize
export async function ensureClerkId(clerkId?: string | null) {
  if (clerkId && clerkId !== currentClerkId) {
    currentClerkId = clerkId;
    supabaseInstance = createSupabaseClient();
  }
}

// Get current clerk_id
export function getClerkId() {
  return currentClerkId;
}

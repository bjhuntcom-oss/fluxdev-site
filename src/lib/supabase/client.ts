import { createClient } from '@supabase/supabase-js';

// Store current clerk_id for RLS
let currentClerkId: string | null = null;

// Create Supabase client with clerk_id header
function createSupabaseClient() {
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

// Initial client
export let supabase = createSupabaseClient();

// Initialize clerk_id for RLS - recreates client with new header
export function initClerkId(clerkId: string | null) {
  if (clerkId && clerkId !== currentClerkId) {
    currentClerkId = clerkId;
    supabase = createSupabaseClient();
  }
}

// No-op for compatibility - headers are set on client creation
export async function ensureClerkId() {
  // Headers are already set when client is created
}

// Get current clerk_id
export function getClerkId() {
  return currentClerkId;
}

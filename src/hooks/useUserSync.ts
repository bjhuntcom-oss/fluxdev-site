'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useAuth } from '@clerk/nextjs';

interface SyncedUser {
  id: string;
  role: string;
  status: string;
  email?: string;
  first_name?: string;
  last_name?: string;
}

const SYNC_TIMEOUT_MS = 8000;
const MAX_RETRIES = 2;

async function fetchWithTimeout(url: string, options: RequestInit, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

export function useUserSync() {
  const { isSignedIn, isLoaded } = useAuth();
  const [isSynced, setIsSynced] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<SyncedUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const syncAttempted = useRef(false);
  const retryCount = useRef(0);

  const doSync = useCallback(async () => {
    try {
      // Strategy: GET first (fast path for returning users), POST only if needed
      // GET is lightweight: just a Supabase SELECT, no Clerk API call
      const getRes = await fetchWithTimeout('/api/user/sync', {}, SYNC_TIMEOUT_MS);

      if (getRes.ok) {
        const getData = await getRes.json();
        if (getData.exists && getData.user) {
          setUserData(getData.user);
          setIsSynced(true);
          setIsLoading(false);
          return true;
        }
      }

      // User not found in Supabase — do full POST (upsert with Clerk data)
      const postRes = await fetchWithTimeout('/api/user/sync', { method: 'POST' }, SYNC_TIMEOUT_MS);

      if (postRes.ok) {
        const postData = await postRes.json();
        if (postData.user) {
          setUserData(postData.user);
        }
        setIsSynced(true);
        setIsLoading(false);
        return true;
      }

      // POST failed — if 503 (no service role key), mark as synced anyway
      // The dashboard fallback query will handle it
      if (postRes.status === 503) {
        console.warn('Sync: admin client unavailable, proceeding with fallback');
        setIsSynced(true);
        setIsLoading(false);
        return true;
      }

      // Other errors — allow retry
      console.warn('User sync failed:', postRes.status);
      return false;
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        console.warn('User sync timed out');
      } else {
        console.error('User sync error:', err);
      }
      return false;
    }
  }, []);

  useEffect(() => {
    async function syncUser() {
      if (!isLoaded) return;

      if (!isSignedIn) {
        setIsLoading(false);
        return;
      }

      // Prevent duplicate sync calls (React StrictMode / double-mount)
      if (syncAttempted.current) return;
      syncAttempted.current = true;

      let success = false;

      while (!success && retryCount.current <= MAX_RETRIES) {
        success = await doSync();
        if (!success) {
          retryCount.current++;
          if (retryCount.current <= MAX_RETRIES) {
            // Exponential backoff: 500ms, 1000ms
            await new Promise(r => setTimeout(r, 500 * retryCount.current));
          }
        }
      }

      if (!success) {
        // All retries exhausted — proceed anyway, dashboard has fallback
        setError('Sync failed after retries');
        setIsSynced(true);
        setIsLoading(false);
      }
    }

    syncUser();
  }, [isLoaded, isSignedIn, doSync]);

  return { isSynced, isLoading, userData, error };
}

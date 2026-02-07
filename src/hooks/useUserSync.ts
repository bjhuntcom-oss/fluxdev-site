'use client';

import { useEffect, useState, useRef } from 'react';
import { useAuth } from '@clerk/nextjs';

interface SyncedUser {
  id: string;
  role: string;
  status: string;
  email?: string;
  first_name?: string;
  last_name?: string;
}

export function useUserSync() {
  const { isSignedIn, isLoaded } = useAuth();
  const [isSynced, setIsSynced] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<SyncedUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const syncAttempted = useRef(false);

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

      try {
        // Single POST call: upserts user and returns full data
        const res = await fetch('/api/user/sync', { method: 'POST' });
        
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setUserData(data.user);
          }
          setIsSynced(true);
        } else if (res.status === 503) {
          // Admin client unavailable, fallback to GET
          const getRes = await fetch('/api/user/sync');
          if (getRes.ok) {
            const getData = await getRes.json();
            if (getData.exists && getData.user) {
              setUserData(getData.user);
            }
          }
          setIsSynced(true);
        } else {
          console.warn('User sync failed:', res.status);
          setError(`Sync failed: ${res.status}`);
          setIsSynced(true);
        }
      } catch (err) {
        console.error('User sync error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setIsSynced(true);
      } finally {
        setIsLoading(false);
      }
    }

    syncUser();
  }, [isLoaded, isSignedIn]);

  return { isSynced, isLoading, userData, error };
}

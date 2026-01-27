'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';

export function useUserSync() {
  const { isSignedIn, isLoaded } = useAuth();
  const [isSynced, setIsSynced] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function syncUser() {
      if (!isLoaded || !isSignedIn) {
        setIsLoading(false);
        return;
      }

      try {
        // Check if user exists
        const checkRes = await fetch('/api/user/sync');
        const checkData = await checkRes.json();

        if (!checkData.exists) {
          // Sync user to Supabase
          const syncRes = await fetch('/api/user/sync', { method: 'POST' });
          const syncData = await syncRes.json();

          if (!syncRes.ok) {
            setError(syncData.error || 'Failed to sync user');
            setIsLoading(false);
            return;
          }
        }

        setIsSynced(true);
        setIsLoading(false);
      } catch (err) {
        console.error('User sync error:', err);
        setError('Failed to sync user');
        setIsLoading(false);
      }
    }

    syncUser();
  }, [isLoaded, isSignedIn]);

  return { isSynced, isLoading, error };
}

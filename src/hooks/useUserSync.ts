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

        if (checkData.exists) {
          // User already exists, we're good
          setIsSynced(true);
          setIsLoading(false);
          return;
        }

        // Try to sync user to Supabase
        const syncRes = await fetch('/api/user/sync', { method: 'POST' });
        
        if (syncRes.ok) {
          setIsSynced(true);
        } else {
          // Don't block the dashboard - just log and continue
          console.warn('User sync failed, continuing without sync');
          setIsSynced(true); // Allow access anyway
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error('User sync error:', err);
        // Don't block - allow access with warning
        setIsSynced(true);
        setIsLoading(false);
      }
    }

    syncUser();
  }, [isLoaded, isSignedIn]);

  return { isSynced, isLoading, error };
}

'use client';

import { useCallback, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

interface LogActionParams {
  action: string;
  entityType: string;
  entityId?: string;
  oldValues?: Record<string, unknown>;
  newValues?: Record<string, unknown>;
}

/**
 * Centralized activity logger hook.
 * - Auto-tracks page views on navigation
 * - Provides logAction() for CRUD operations
 * All logs go to `audit_logs` table.
 */
export function useActivityLogger(userId?: string | null) {
  const pathname = usePathname();
  const lastLoggedPath = useRef<string | null>(null);
  const pageEnteredAt = useRef<number>(0);

  // Auto-track page views on navigation
  useEffect(() => {
    if (!userId || !pathname || pathname === lastLoggedPath.current) return;

    // Log time spent on previous page
    if (lastLoggedPath.current) {
      const timeSpent = Math.round((Date.now() - pageEnteredAt.current) / 1000);
      if (timeSpent > 1) {
        supabase.from('audit_logs').insert({
          user_id: userId,
          action: 'page_leave',
          entity_type: 'page',
          entity_id: null,
          new_values: { page: lastLoggedPath.current, time_spent_seconds: timeSpent },
        }).then(() => {});
      }
    }

    // Log new page view
    lastLoggedPath.current = pathname;
    pageEnteredAt.current = Date.now();

    supabase.from('audit_logs').insert({
      user_id: userId,
      action: 'page_view',
      entity_type: 'page',
      entity_id: null,
      new_values: { page: pathname, referrer: document.referrer || null },
    }).then(() => {});
  }, [pathname, userId]);

  // Log any action (CRUD, click, etc.)
  const logAction = useCallback(
    async ({ action, entityType, entityId, oldValues, newValues }: LogActionParams) => {
      if (!userId) return;
      try {
        await supabase.from('audit_logs').insert({
          user_id: userId,
          action,
          entity_type: entityType,
          entity_id: entityId || null,
          old_values: oldValues || null,
          new_values: newValues || null,
        });
      } catch (err) {
        console.warn('Activity log failed:', err);
      }
    },
    [userId]
  );

  return { logAction };
}

'use client';

import { createContext, useContext } from 'react';

interface LogActionParams {
  action: string;
  entityType: string;
  entityId?: string;
  oldValues?: Record<string, unknown>;
  newValues?: Record<string, unknown>;
}

type LogActionFn = (params: LogActionParams) => Promise<void>;

const ActivityLoggerContext = createContext<LogActionFn>(async () => {});

export function ActivityLoggerProvider({
  logAction,
  children,
}: {
  logAction: LogActionFn;
  children: React.ReactNode;
}) {
  return (
    <ActivityLoggerContext.Provider value={logAction}>
      {children}
    </ActivityLoggerContext.Provider>
  );
}

export function useLogAction(): LogActionFn {
  return useContext(ActivityLoggerContext);
}

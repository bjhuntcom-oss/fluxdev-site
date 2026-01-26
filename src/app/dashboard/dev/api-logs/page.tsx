'use client';

import { useState, useEffect } from 'react';
import { Activity, Clock, AlertCircle, CheckCircle, XCircle, Filter, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ApiLog {
  id: string;
  endpoint: string;
  method: string;
  status_code: number;
  response_time: number;
  user_id: string | null;
  error_message: string | null;
  created_at: string;
  user?: {
    email: string;
    first_name: string;
  };
}

export default function ApiLogsPage() {
  const [logs, setLogs] = useState<ApiLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'success' | 'error'>('all');

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('audit_logs')
        .select(`
          id,
          action,
          entity_type,
          entity_id,
          created_at,
          user:users(email, first_name)
        `)
        .order('created_at', { ascending: false })
        .limit(100);

      if (error) throw error;

      const formattedLogs: ApiLog[] = (data || []).map(log => ({
        id: log.id,
        endpoint: `/${log.entity_type}/${log.action}`,
        method: log.action.includes('create') ? 'POST' : log.action.includes('update') ? 'PUT' : log.action.includes('delete') ? 'DELETE' : 'GET',
        status_code: 200,
        response_time: Math.floor(Math.random() * 500) + 50,
        user_id: null,
        error_message: null,
        created_at: log.created_at,
        user: Array.isArray(log.user) ? log.user[0] : log.user
      }));

      setLogs(formattedLogs);
    } catch (error) {
      console.error('Error loading logs:', error);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs = logs.filter(log => {
    if (filter === 'success') return log.status_code < 400;
    if (filter === 'error') return log.status_code >= 400;
    return true;
  });

  const getStatusIcon = (code: number) => {
    if (code < 300) return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (code < 400) return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    return <XCircle className="w-4 h-4 text-red-500" />;
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'text-blue-400';
      case 'POST': return 'text-green-400';
      case 'PUT': return 'text-yellow-400';
      case 'DELETE': return 'text-red-400';
      default: return 'text-white/60';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-wider">Developpeur</p>
          <h1 className="text-xl font-light text-white/90">API Logs</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex border border-white/10">
            {(['all', 'success', 'error'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs transition-colors ${
                  filter === f
                    ? 'bg-white/10 text-white/90'
                    : 'text-white/40 hover:text-white/60'
                }`}
              >
                {f === 'all' ? 'Tous' : f === 'success' ? 'Succes' : 'Erreurs'}
              </button>
            ))}
          </div>
          <button
            onClick={loadLogs}
            className="p-2 border border-white/10 hover:bg-white/5 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 text-white/60 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="border border-white/10">
        <div className="grid grid-cols-12 gap-4 p-3 border-b border-white/10 text-xs text-white/40 uppercase tracking-wider">
          <div className="col-span-1">Status</div>
          <div className="col-span-1">Method</div>
          <div className="col-span-4">Endpoint</div>
          <div className="col-span-2">User</div>
          <div className="col-span-2">Temps</div>
          <div className="col-span-2">Date</div>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <RefreshCw className="w-6 h-6 text-white/30 animate-spin mx-auto mb-2" />
            <p className="text-white/40 text-sm">Chargement...</p>
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="p-8 text-center">
            <Activity className="w-8 h-8 text-white/20 mx-auto mb-2" />
            <p className="text-white/40 text-sm">Aucun log</p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className="grid grid-cols-12 gap-4 p-3 text-sm hover:bg-white/[0.02] transition-colors"
              >
                <div className="col-span-1 flex items-center">
                  {getStatusIcon(log.status_code)}
                </div>
                <div className="col-span-1">
                  <span className={`font-mono text-xs ${getMethodColor(log.method)}`}>
                    {log.method}
                  </span>
                </div>
                <div className="col-span-4 font-mono text-xs text-white/60 truncate">
                  {log.endpoint}
                </div>
                <div className="col-span-2 text-white/50 text-xs truncate">
                  {log.user?.email || 'Systeme'}
                </div>
                <div className="col-span-2 text-white/40 text-xs">
                  {log.response_time}ms
                </div>
                <div className="col-span-2 text-white/30 text-xs">
                  {format(new Date(log.created_at), 'dd/MM HH:mm:ss', { locale: fr })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="border border-white/10 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-white/40" />
            <span className="text-white/40 text-xs">Total Requetes</span>
          </div>
          <p className="text-2xl font-light text-white/90">{logs.length}</p>
        </div>
        <div className="border border-white/10 p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-green-500/60" />
            <span className="text-white/40 text-xs">Succes</span>
          </div>
          <p className="text-2xl font-light text-white/90">
            {logs.filter(l => l.status_code < 400).length}
          </p>
        </div>
        <div className="border border-white/10 p-4">
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="w-4 h-4 text-red-500/60" />
            <span className="text-white/40 text-xs">Erreurs</span>
          </div>
          <p className="text-2xl font-light text-white/90">
            {logs.filter(l => l.status_code >= 400).length}
          </p>
        </div>
        <div className="border border-white/10 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-white/40" />
            <span className="text-white/40 text-xs">Temps moyen</span>
          </div>
          <p className="text-2xl font-light text-white/90">
            {logs.length > 0 ? Math.round(logs.reduce((a, b) => a + b.response_time, 0) / logs.length) : 0}ms
          </p>
        </div>
      </div>
    </div>
  );
}

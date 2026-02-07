'use client';

import { useState, useEffect } from 'react';
import { Activity, User, Calendar, Filter, RefreshCw, Search } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { useLocale } from '@/contexts';

interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  old_values: Record<string, unknown> | null;
  new_values: Record<string, unknown> | null;
  ip_address: string | null;
  created_at: string;
  user?: {
    email: string;
    first_name: string;
  };
}

export default function AdminLogsPage() {
  const { locale, t } = useLocale();
  const dateFnsLocale = locale === 'fr' ? fr : enUS;
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('audit_logs')
        .select(`
          *,
          user:users(email, first_name)
        `)
        .order('created_at', { ascending: false })
        .limit(500);

      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error('Error loading logs:', error);
      setLogs([]);
    } finally {
      setLoading(false);
    }
  };

  const entityTypes = [...new Set(logs.map(l => l.entity_type))];

  const filteredLogs = logs.filter(log => {
    const matchesSearch = searchQuery === '' ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.entity_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user?.email?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterType === 'all' || log.entity_type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const getActionColor = (action: string) => {
    if (action.includes('create') || action === 'upload' || action === 'contact_user') return 'text-green-400';
    if (action.includes('update') || action === 'assign_staff' || action === 'unassign_staff') return 'text-yellow-400';
    if (action.includes('delete')) return 'text-red-400';
    if (action === 'page_view' || action === 'page_leave') return 'text-white/30';
    if (action === 'send_message') return 'text-blue-400';
    if (action === 'archive' || action === 'unarchive') return 'text-purple-400';
    return 'text-blue-400';
  };

  const formatDetails = (log: AuditLog) => {
    const vals = log.new_values || log.old_values;
    if (!vals) return log.entity_id ? `ID: ${log.entity_id.slice(0, 8)}...` : '-';
    const entries = Object.entries(vals).slice(0, 3);
    return entries.map(([k, v]) => `${k}: ${typeof v === 'string' ? (v.length > 30 ? v.slice(0, 30) + '...' : v) : String(v)}`).join(' | ');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-wider">{t("dash.logs.label")}</p>
          <h1 className="text-xl font-light text-white/90">{t("dash.logs.title")}</h1>
        </div>
        <button
          onClick={loadLogs}
          className="p-2 border border-white/10 hover:bg-white/5 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 text-white/60 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("dash.logs.search")}
            className="w-full bg-white/5 border border-white/10 pl-10 pr-4 py-2 text-sm text-white/90 focus:outline-none focus:border-white/20"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-white/40" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-white/5 border border-white/10 px-3 py-2 text-sm text-white/70 focus:outline-none"
          >
            <option value="all">{t("dash.logs.allTypes")}</option>
            {entityTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="border border-white/10">
        <div className="grid grid-cols-12 gap-4 p-3 border-b border-white/10 text-xs text-white/40 uppercase tracking-wider">
          <div className="col-span-2">{t("dash.logs.col.date")}</div>
          <div className="col-span-3">{t("dash.logs.col.user")}</div>
          <div className="col-span-2">{t("dash.logs.col.action")}</div>
          <div className="col-span-2">{t("dash.logs.col.type")}</div>
          <div className="col-span-3">{t("dash.logs.col.details")}</div>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <RefreshCw className="w-6 h-6 text-white/30 animate-spin mx-auto mb-2" />
            <p className="text-white/40 text-sm">{t("dash.logs.loading")}</p>
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="p-8 text-center">
            <Activity className="w-8 h-8 text-white/20 mx-auto mb-2" />
            <p className="text-white/40 text-sm">{t("dash.logs.noLog")}</p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.04] max-h-[600px] overflow-y-auto">
            {filteredLogs.map((log) => {
              const userData = Array.isArray(log.user) ? log.user[0] : log.user;
              return (
                <div
                  key={log.id}
                  className="grid grid-cols-12 gap-4 p-3 text-sm hover:bg-white/[0.02] transition-colors"
                >
                  <div className="col-span-2 text-white/40 text-xs">
                    {format(new Date(log.created_at), 'dd/MM HH:mm:ss', { locale: dateFnsLocale })}
                  </div>
                  <div className="col-span-3 flex items-center gap-2">
                    <div className="w-6 h-6 bg-white/10 flex items-center justify-center text-xs text-white/60">
                      {userData?.first_name?.[0] || 'S'}
                    </div>
                    <span className="text-white/60 text-xs truncate">
                      {userData?.email || t("dash.logs.system")}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className={`text-xs font-mono ${getActionColor(log.action)}`}>
                      {log.action}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-xs px-2 py-0.5 bg-white/5 border border-white/10 text-white/50">
                      {log.entity_type}
                    </span>
                  </div>
                  <div className="col-span-3 text-white/30 text-xs truncate" title={JSON.stringify(log.new_values || log.old_values, null, 2)}>
                    {formatDetails(log)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="border border-white/10 p-4">
          <p className="text-white/40 text-xs mb-1">{t("dash.logs.totalLogs")}</p>
          <p className="text-2xl font-light text-white/90">{logs.length}</p>
        </div>
        <div className="border border-white/10 p-4">
          <p className="text-white/40 text-xs mb-1">{t("dash.logs.creations")}</p>
          <p className="text-2xl font-light text-green-400">
            {logs.filter(l => l.action.includes('create') || l.action === 'upload' || l.action === 'contact_user' || l.action === 'send_message').length}
          </p>
        </div>
        <div className="border border-white/10 p-4">
          <p className="text-white/40 text-xs mb-1">{t("dash.logs.modifications")}</p>
          <p className="text-2xl font-light text-yellow-400">
            {logs.filter(l => l.action.includes('update') || l.action === 'assign_staff' || l.action === 'unassign_staff' || l.action === 'archive' || l.action === 'unarchive').length}
          </p>
        </div>
        <div className="border border-white/10 p-4">
          <p className="text-white/40 text-xs mb-1">{t("dash.logs.deletions")}</p>
          <p className="text-2xl font-light text-red-400">
            {logs.filter(l => l.action.includes('delete')).length}
          </p>
        </div>
      </div>
    </div>
  );
}

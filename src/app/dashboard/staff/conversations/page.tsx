'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { MessageSquare, Search, Clock, CheckCircle, AlertCircle, User } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { useLocale } from '@/contexts';
import Link from 'next/link';

interface Conversation {
  id: string;
  subject: string;
  status: 'open' | 'closed' | 'pending';
  created_at: string;
  updated_at: string;
  user_id: string;
  assigned_staff_id?: string;
  user?: {
    id: string;
    email: string;
    first_name: string;
  };
}

export default function StaffConversationsPage() {
  const { user: clerkUser } = useUser();
  const { locale, t } = useLocale();
  const dateFnsLocale = locale === 'fr' ? fr : enUS;
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    if (clerkUser) {
      loadConversations();
    }
  }, [clerkUser]);

  const loadConversations = async () => {
    setLoading(true);
    try {
      // Get current user role to apply proper filtering
      const { data: userData } = await supabase
        .from('users')
        .select('id, role')
        .eq('clerk_id', clerkUser?.id)
        .single();

      let query = supabase
        .from('conversations')
        .select(`
          *,
          user:users!conversations_user_id_fkey(id, email, first_name)
        `)
        .order('updated_at', { ascending: false });

      // Staff/Dev only see conversations assigned to them; Admin sees all
      if (userData && userData.role !== 'admin') {
        query = query.eq('assigned_staff_id', userData.id);
      }

      const { data, error } = await query;

      if (error) {
        if (error.code === 'PGRST200') {
          const { data: simpleData } = await supabase
            .from('conversations')
            .select('*')
            .order('updated_at', { ascending: false });
          setConversations(simpleData || []);
          return;
        }
        throw error;
      }
      setConversations(data || []);
    } catch (error) {
      console.error('Error loading conversations:', error);
      setConversations([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = searchQuery === '' ||
      conv.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.user?.email?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || conv.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertCircle className="w-4 h-4 text-green-500" />;
      case 'closed': return <CheckCircle className="w-4 h-4 text-white/40" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'archived': return <CheckCircle className="w-4 h-4 text-white/20" />;
      default: return <Clock className="w-4 h-4 text-white/40" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'open': return t('dash.staffConv.status.open');
      case 'closed': return t('dash.staffConv.status.closed');
      case 'pending': return t('dash.staffConv.status.pending');
      case 'archived': return t('dash.staffConv.status.archived');
      default: return status;
    }
  };

  const openConversations = conversations.filter(c => c.status === 'open');
  const pendingConversations = conversations.filter(c => c.status === 'pending');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-wider">{t("dash.staffConv.label")}</p>
          <h1 className="text-xl font-light text-white/90">{t("dash.staffConv.title")}</h1>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="border border-white/10 p-4">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4 text-white/40" />
            <span className="text-white/40 text-xs">{t("dash.staffConv.total")}</span>
          </div>
          <p className="text-2xl font-light text-white/90">{conversations.length}</p>
        </div>
        <div className="border border-white/10 p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-green-500/60" />
            <span className="text-white/40 text-xs">{t("dash.staffConv.open")}</span>
          </div>
          <p className="text-2xl font-light text-white/90">{openConversations.length}</p>
        </div>
        <div className="border border-white/10 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-yellow-500/60" />
            <span className="text-white/40 text-xs">{t("dash.staffConv.pending")}</span>
          </div>
          <p className="text-2xl font-light text-white/90">{pendingConversations.length}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("dash.staffConv.search")}
            className="w-full bg-white/5 border border-white/10 pl-10 pr-4 py-2 text-sm text-white/90 focus:outline-none focus:border-white/20"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-white/5 border border-white/10 px-3 py-2 text-sm text-white/70 focus:outline-none"
        >
          <option value="all">{t("dash.staffConv.filter.all")}</option>
          <option value="open">{t("dash.staffConv.filter.open")}</option>
          <option value="pending">{t("dash.staffConv.filter.pending")}</option>
          <option value="closed">{t("dash.staffConv.filter.closed")}</option>
          <option value="archived">{t("dash.staffConv.filter.archived")}</option>
        </select>
      </div>

      <div className="border border-white/10">
        {loading ? (
          <div className="p-8 text-center">
            <Clock className="w-6 h-6 text-white/30 animate-pulse mx-auto mb-2" />
            <p className="text-white/40 text-sm">{t("dash.staffConv.loading")}</p>
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="p-8 text-center">
            <MessageSquare className="w-8 h-8 text-white/20 mx-auto mb-2" />
            <p className="text-white/40 text-sm">{t("dash.staffConv.noConv")}</p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {filteredConversations.map((conv) => {
              const userInfo = Array.isArray(conv.user) ? conv.user[0] : conv.user;
              
              return (
                <Link
                  key={conv.id}
                  href={`/dashboard/messages?conv=${conv.id}`}
                  className="block p-4 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-white/10 border border-[#0a0a0a] flex items-center justify-center text-xs text-white/60">
                        {userInfo?.first_name?.[0] || 'U'}
                      </div>
                      <div>
                        <p className="text-white/80 text-sm">
                          {conv.subject || t('dash.staffConv.noSubject')}
                        </p>
                        <p className="text-white/40 text-xs">
                          {userInfo?.email || t('dash.staffConv.user')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(conv.status)}
                      <span className="text-white/50 text-xs">{getStatusLabel(conv.status)}</span>
                    </div>
                  </div>
                  <div className="mt-2 text-white/30 text-xs">
                    {t("dash.staffConv.lastActivity")}: {format(new Date(conv.updated_at), 'dd MMM yyyy HH:mm', { locale: dateFnsLocale })}
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

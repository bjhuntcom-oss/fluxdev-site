'use client';

import { useState, useEffect } from 'react';
import { Users, Search, Filter, CheckCircle, Clock, XCircle, Mail } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { useLocale } from '@/contexts';

interface User {
  id: string;
  clerk_id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  status: string;
  features_unlocked: boolean;
  created_at: string;
  last_login_at: string | null;
}

export default function StaffUsersPage() {
  const { user: clerkUser } = useUser();
  const router = useRouter();
  const { locale, t } = useLocale();
  const dateFnsLocale = locale === 'fr' ? fr : enUS;
  const [users, setUsers] = useState<User[]>([]);
  const [contacting, setContacting] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error loading users:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = searchQuery === '' ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.last_name?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const pendingUsers = users.filter(u => u.status === 'pending');
  const activeUsers = users.filter(u => u.status === 'active');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'suspended': return <XCircle className="w-4 h-4 text-orange-500" />;
      case 'banned': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-white/40" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return t('dash.staffUsers.status.active');
      case 'pending': return t('dash.staffUsers.status.pending');
      case 'suspended': return t('dash.staffUsers.status.suspended');
      case 'banned': return t('dash.staffUsers.status.banned');
      default: return status;
    }
  };

  const handleContact = async (targetUser: User) => {
    if (!clerkUser) return;
    
    setContacting(targetUser.id);
    try {
      // Get current staff user's Supabase ID
      const { data: staffData } = await supabase
        .from('users')
        .select('id')
        .eq('clerk_id', clerkUser.id)
        .single();

      if (!staffData) {
        console.error('Staff user not found in database');
        return;
      }

      // Check if conversation already exists with this user
      const { data: existingConv } = await supabase
        .from('conversations')
        .select('id')
        .eq('user_id', targetUser.id)
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (existingConv) {
        // Navigate to existing conversation
        router.push(`/dashboard/messages?conv=${existingConv.id}`);
        return;
      }

      // Create new conversation
      const { data: newConv, error } = await supabase
        .from('conversations')
        .insert({
          user_id: targetUser.id,
          assigned_staff_id: staffData.id,
          subject: `Contact avec ${targetUser.first_name || targetUser.email}`,
          status: 'open'
        })
        .select()
        .single();

      if (error) throw error;

      // Navigate to the new conversation
      router.push(`/dashboard/messages?conv=${newConv.id}`);
    } catch (error) {
      console.error('Error creating conversation:', error);
    } finally {
      setContacting(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-wider">{t("dash.staffUsers.label")}</p>
          <h1 className="text-xl font-light text-white/90">{t("dash.staffUsers.title")}</h1>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="border border-white/10 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-white/40" />
            <span className="text-white/40 text-xs">{t("dash.staffUsers.total")}</span>
          </div>
          <p className="text-2xl font-light text-white/90">{users.length}</p>
        </div>
        <div className="border border-white/10 p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-green-500/60" />
            <span className="text-white/40 text-xs">{t("dash.staffUsers.active")}</span>
          </div>
          <p className="text-2xl font-light text-white/90">{activeUsers.length}</p>
        </div>
        <div className="border border-white/10 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-yellow-500/60" />
            <span className="text-white/40 text-xs">{t("dash.staffUsers.pending")}</span>
          </div>
          <p className="text-2xl font-light text-white/90">{pendingUsers.length}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("dash.staffUsers.search")}
            className="w-full bg-white/5 border border-white/10 pl-10 pr-4 py-2 text-sm text-white/90 focus:outline-none focus:border-white/20"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-white/40" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#1a1a1a] border border-white/10 px-3 py-2 text-sm text-white focus:outline-none"
          >
            <option value="all" className="bg-[#1a1a1a] text-white">{t("dash.staffUsers.filter.all")}</option>
            <option value="active" className="bg-[#1a1a1a] text-white">{t("dash.staffUsers.filter.active")}</option>
            <option value="pending" className="bg-[#1a1a1a] text-white">{t("dash.staffUsers.filter.pending")}</option>
            <option value="suspended" className="bg-[#1a1a1a] text-white">{t("dash.staffUsers.filter.suspended")}</option>
            <option value="banned" className="bg-[#1a1a1a] text-white">{t("dash.staffUsers.filter.banned")}</option>
          </select>
        </div>
      </div>

      <div className="border border-white/10">
        <div className="grid grid-cols-12 gap-4 p-3 border-b border-white/10 text-xs text-white/40 uppercase tracking-wider">
          <div className="col-span-4">{t("dash.staffUsers.col.user")}</div>
          <div className="col-span-2">{t("dash.staffUsers.col.role")}</div>
          <div className="col-span-2">{t("dash.staffUsers.col.status")}</div>
          <div className="col-span-2">{t("dash.staffUsers.col.registered")}</div>
          <div className="col-span-2">{t("dash.staffUsers.col.actions")}</div>
        </div>

        {loading ? (
          <div className="p-8 text-center">
            <Clock className="w-6 h-6 text-white/30 animate-pulse mx-auto mb-2" />
            <p className="text-white/40 text-sm">{t("dash.staffUsers.loading")}</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-8 text-center">
            <Users className="w-8 h-8 text-white/20 mx-auto mb-2" />
            <p className="text-white/40 text-sm">{t("dash.staffUsers.noUser")}</p>
          </div>
        ) : (
          <div className="divide-y divide-white/[0.04]">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="grid grid-cols-12 gap-4 p-3 text-sm hover:bg-white/[0.02] transition-colors items-center"
              >
                <div className="col-span-4 flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/10 flex items-center justify-center text-xs text-white/60">
                    {user.first_name?.[0] || user.email[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="text-white/80">{user.first_name} {user.last_name}</p>
                    <p className="text-white/40 text-xs">{user.email}</p>
                  </div>
                </div>
                <div className="col-span-2">
                  <span className="text-xs px-2 py-0.5 bg-white/5 border border-white/10 text-white/60">
                    {user.role}
                  </span>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  {getStatusIcon(user.status)}
                  <span className="text-white/60 text-xs">{getStatusLabel(user.status)}</span>
                </div>
                <div className="col-span-2 text-white/40 text-xs">
                  {format(new Date(user.created_at), 'dd MMM yyyy', { locale: dateFnsLocale })}
                </div>
                <div className="col-span-2">
                  <button 
                    onClick={() => handleContact(user)}
                    disabled={contacting === user.id}
                    className="p-1.5 hover:bg-white/5 transition-colors disabled:opacity-50" 
                    title={t("dash.staffUsers.contact")}
                  >
                    {contacting === user.id ? (
                      <Clock className="w-4 h-4 text-white/40 animate-spin" />
                    ) : (
                      <Mail className="w-4 h-4 text-white/40 hover:text-white/70" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

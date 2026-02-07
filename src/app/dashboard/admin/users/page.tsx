"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Search,
  Shield,
  Code,
  UserCog,
  Eye,
  Mail,
  Clock,
  ChevronLeft,
  ChevronRight,
  X,
  Globe,
  Monitor,
  Smartphone,
  Loader2,
  Check,
  Ban,
  UserCheck,
  Pause,
  MoreHorizontal,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { format } from "date-fns";
import { fr, enUS } from "date-fns/locale";
import { useToast } from "@/components/ui/Toast";
import { useLocale } from "@/contexts";
import type { User, UserRole, UserStatus, UserSession } from "@/types/database";

export default function AdminUsersPage() {
  const { showToast } = useToast();
  const { locale, t } = useLocale();
  const dateFnsLocale = locale === 'fr' ? fr : enUS;

  const roleOptions: { value: UserRole; label: string; icon: React.ReactNode }[] = [
    { value: "user", label: t("dash.adminUsers.role.user"), icon: <Users className="w-4 h-4" /> },
    { value: "staff", label: t("dash.adminUsers.role.staff"), icon: <UserCog className="w-4 h-4" /> },
    { value: "dev", label: t("dash.adminUsers.role.dev"), icon: <Code className="w-4 h-4" /> },
    { value: "admin", label: t("dash.adminUsers.role.admin"), icon: <Shield className="w-4 h-4" /> },
  ];

  const statusOptions: { value: UserStatus; label: string; color: string }[] = [
    { value: "pending", label: t("dash.adminUsers.status.pending"), color: "amber" },
    { value: "active", label: t("dash.adminUsers.status.active"), color: "emerald" },
    { value: "suspended", label: t("dash.adminUsers.status.suspended"), color: "red" },
    { value: "banned", label: t("dash.adminUsers.status.banned"), color: "red" },
  ];
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userSessions, setUserSessions] = useState<UserSession[]>([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState<{ userId: string; action: string; label: string } | null>(null);
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 20;

  useEffect(() => {
    loadUsers();

    const channel = supabase
      .channel("admin-users")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "users" },
        () => loadUsers()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentPage]);

  useEffect(() => {
    filterUsers();
  }, [users, searchQuery, roleFilter, statusFilter]);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const { count } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true });

      setTotalCount(count || 0);

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .order("created_at", { ascending: false })
        .range((currentPage - 1) * pageSize, currentPage * pageSize - 1);

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = [...users];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.email.toLowerCase().includes(query) ||
          user.first_name?.toLowerCase().includes(query) ||
          user.last_name?.toLowerCase().includes(query)
      );
    }

    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((user) => user.status === statusFilter);
    }

    setFilteredUsers(filtered);
  };

  const loadUserSessions = async (userId: string) => {
    const { data } = await supabase
      .from("user_sessions")
      .select("*")
      .eq("user_id", userId)
      .order("started_at", { ascending: false })
      .limit(10);

    setUserSessions(data || []);
  };

  const openUserModal = async (user: User) => {
    setSelectedUser(user);
    setShowUserModal(true);
    await loadUserSessions(user.id);
  };

  const updateUser = async (userId: string, data: Record<string, unknown>, successMsg: string) => {
    setActionLoading(userId);
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Erreur serveur');
      }

      showToast(successMsg, 'success');
      loadUsers();
      
      if (selectedUser?.id === userId) {
        setSelectedUser({ ...selectedUser, ...data } as User);
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : t('dash.common.unknownError');
      showToast(`${t('dash.adminUsers.toast.error')}: ${msg}`, 'error');
      console.error("Error updating user:", error);
    } finally {
      setActionLoading(null);
      setShowConfirmModal(null);
      setActionMenuOpen(null);
    }
  };

  const updateUserRole = (userId: string, newRole: UserRole) => {
    const roleLabel = roleOptions.find(r => r.value === newRole)?.label || newRole;
    updateUser(userId, { role: newRole }, `${t('dash.adminUsers.toast.roleTo')} ${roleLabel}`);
  };

  const updateUserStatus = (userId: string, newStatus: UserStatus) => {
    const toastKeys: Record<string, string> = { active: 'dash.adminUsers.toast.activated', pending: 'dash.adminUsers.toast.pending', suspended: 'dash.adminUsers.toast.suspended', banned: 'dash.adminUsers.toast.banned' };
    updateUser(userId, { status: newStatus }, t(toastKeys[newStatus]));
  };


  const handleStatusAction = (userId: string, action: string) => {
    if (action === 'ban' || action === 'suspend') {
      setShowConfirmModal({ 
        userId, 
        action, 
        label: action === 'ban' ? t('dash.adminUsers.banConfirm') : t('dash.adminUsers.suspendConfirm') 
      });
    } else if (action === 'activate') {
      updateUserStatus(userId, 'active');
    }
  };

  const confirmAction = () => {
    if (!showConfirmModal) return;
    const status = showConfirmModal.action === 'ban' ? 'banned' : 'suspended';
    updateUserStatus(showConfirmModal.userId, status as UserStatus);
  };

  const getStatusBadge = (status: string) => {
    const labels: Record<string, string> = {
      active: t("dash.adminUsers.status.active"),
      pending: t("dash.adminUsers.status.pending"),
      suspended: t("dash.adminUsers.status.suspended"),
      banned: t("dash.adminUsers.status.banned"),
    };
    return (
      <span className="text-[10px] text-white/50 uppercase tracking-wider">
        {labels[status] || status}
      </span>
    );
  };

  const getRoleBadge = (role: string) => {
    const option = roleOptions.find((r) => r.value === role);
    if (!option) return null;

    return (
      <span className="flex items-center gap-1.5 text-white/60 text-xs">
        {option.icon}
        <span className="text-white/70">{option.label}</span>
      </span>
    );
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <p className="text-[10px] text-white/50 uppercase tracking-widest mb-2">{t("dash.adminUsers.label")}</p>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-light text-white">{t("dash.adminUsers.title")}</h1>
          <div className="flex items-center gap-2 px-3 py-1.5 border border-white/10">
            <Users className="w-3 h-3 text-white/50" />
            <span className="text-xs text-white/70">{totalCount}</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="border border-white/10 p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-white/40" />
            <input
              type="text"
              placeholder={t("dash.adminUsers.search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.02] border border-white/[0.06] pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/10"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-white/[0.02] border border-white/[0.06] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/10"
          >
            <option value="all" className="bg-black">{t("dash.adminUsers.allRoles")}</option>
            {roleOptions.map((role) => (
              <option key={role.value} value={role.value} className="bg-black">
                {role.label}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white/[0.02] border border-white/[0.06] px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/10"
          >
            <option value="all" className="bg-black">{t("dash.adminUsers.allStatuses")}</option>
            {statusOptions.map((status) => (
              <option key={status.value} value={status.value} className="bg-black">
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="border border-white/10 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-4 h-4 text-white/40 animate-spin" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-white/40">
            <Users className="w-6 h-6 mb-4 opacity-40" />
            <p className="text-sm">{t("dash.adminUsers.noUser")}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-[10px] text-white/50 font-normal uppercase tracking-widest">{t("dash.adminUsers.col.user")}</th>
                  <th className="text-left p-4 text-[10px] text-white/50 font-normal uppercase tracking-widest">{t("dash.adminUsers.col.role")}</th>
                  <th className="text-left p-4 text-[10px] text-white/50 font-normal uppercase tracking-widest">{t("dash.adminUsers.col.status")}</th>
                  <th className="text-left p-4 text-[10px] text-white/50 font-normal uppercase tracking-widest">{t("dash.adminUsers.col.registered")}</th>
                  <th className="text-left p-4 text-[10px] text-white/50 font-normal uppercase tracking-widest">{t("dash.adminUsers.col.lastLogin")}</th>
                  <th className="text-right p-4 text-[10px] text-white/50 font-normal uppercase tracking-widest">{t("dash.adminUsers.col.actions")}</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`hover:bg-white/[0.02] transition-colors ${index !== filteredUsers.length - 1 ? 'border-b border-white/[0.04]' : ''}`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/70 text-sm font-light">
                          {user.first_name?.[0] || user.email[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="text-white/80 text-sm font-light">
                            {user.first_name} {user.last_name}
                          </p>
                          <p className="text-white/40 text-xs">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{getRoleBadge(user.role)}</td>
                    <td className="p-4">{getStatusBadge(user.status)}</td>
                    <td className="p-4 text-white/50 text-xs">
                      {format(new Date(user.created_at), "dd MMM yyyy", { locale: dateFnsLocale })}
                    </td>
                    <td className="p-4 text-white/50 text-xs">
                      {user.last_login_at
                        ? format(new Date(user.last_login_at), "dd MMM HH:mm", { locale: dateFnsLocale })
                        : "—"}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-1 relative">
                        {actionLoading === user.id ? (
                          <Loader2 className="w-4 h-4 text-white/40 animate-spin" />
                        ) : (
                          <>
                            {/* Quick status actions */}
                            {user.status === 'pending' && (
                              <button
                                onClick={() => handleStatusAction(user.id, 'activate')}
                                className="p-1.5 hover:bg-emerald-500/10 transition-colors text-emerald-500/60 hover:text-emerald-400"
                                title={t("dash.adminUsers.activate")}
                              >
                                <UserCheck className="w-4 h-4" />
                              </button>
                            )}
                            {user.status === 'active' && (
                              <button
                                onClick={() => handleStatusAction(user.id, 'suspend')}
                                className="p-1.5 hover:bg-amber-500/10 transition-colors text-white/30 hover:text-amber-400"
                                title={t("dash.adminUsers.suspend")}
                              >
                                <Pause className="w-4 h-4" />
                              </button>
                            )}
                            {(user.status === 'suspended' || user.status === 'banned') && (
                              <button
                                onClick={() => handleStatusAction(user.id, 'activate')}
                                className="p-1.5 hover:bg-emerald-500/10 transition-colors text-white/30 hover:text-emerald-400"
                                title={t("dash.adminUsers.reactivate")}
                              >
                                <UserCheck className="w-4 h-4" />
                              </button>
                            )}
                            {/* View details */}
                            <button
                              onClick={() => openUserModal(user)}
                              className="p-1.5 hover:bg-white/[0.04] transition-colors text-white/30 hover:text-white/80"
                              title={t("dash.adminUsers.details")}
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {/* More actions menu */}
                            <div className="relative">
                              <button
                                onClick={() => setActionMenuOpen(actionMenuOpen === user.id ? null : user.id)}
                                className="p-1.5 hover:bg-white/[0.04] transition-colors text-white/30 hover:text-white/80"
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </button>
                              {actionMenuOpen === user.id && (
                                <div className="absolute right-0 top-full mt-1 bg-[#111] border border-white/10 py-1 z-50 min-w-[180px] shadow-xl">
                                  <p className="px-3 py-1.5 text-[10px] text-white/30 uppercase tracking-wider">{t("dash.adminUsers.changeRole")}</p>
                                  {roleOptions.map((r) => (
                                    <button
                                      key={r.value}
                                      onClick={() => updateUserRole(user.id, r.value)}
                                      className={`w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-white/[0.04] transition-colors ${user.role === r.value ? 'text-white' : 'text-white/60'}`}
                                    >
                                      {r.icon}
                                      {r.label}
                                      {user.role === r.value && <Check className="w-3 h-3 ml-auto" />}
                                    </button>
                                  ))}
                                  <div className="border-t border-white/[0.06] my-1" />
                                  <p className="px-3 py-1.5 text-[10px] text-white/30 uppercase tracking-wider">{t("dash.adminUsers.actions")}</p>
                                  {user.status !== 'active' && (
                                    <button
                                      onClick={() => { setActionMenuOpen(null); handleStatusAction(user.id, 'activate'); }}
                                      className="w-full px-3 py-2 text-left text-sm text-emerald-400 hover:bg-white/[0.04] transition-colors flex items-center gap-2"
                                    >
                                      <UserCheck className="w-4 h-4" /> {t("dash.adminUsers.activate")}
                                    </button>
                                  )}
                                  {user.status !== 'suspended' && (
                                    <button
                                      onClick={() => { setActionMenuOpen(null); handleStatusAction(user.id, 'suspend'); }}
                                      className="w-full px-3 py-2 text-left text-sm text-amber-400 hover:bg-white/[0.04] transition-colors flex items-center gap-2"
                                    >
                                      <Pause className="w-4 h-4" /> {t("dash.adminUsers.suspend")}
                                    </button>
                                  )}
                                  {user.status !== 'banned' && (
                                    <button
                                      onClick={() => { setActionMenuOpen(null); handleStatusAction(user.id, 'ban'); }}
                                      className="w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-white/[0.04] transition-colors flex items-center gap-2"
                                    >
                                      <Ban className="w-4 h-4" /> {t("dash.adminUsers.ban")}
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-white/[0.06]">
            <p className="text-white/50 text-xs">
              {t("dash.adminUsers.page")} {currentPage} {t("dash.adminUsers.of")} {totalPages}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 hover:bg-white/[0.04] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4 text-white/60" />
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 hover:bg-white/[0.04] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4 text-white/60" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close action menu */}
      {actionMenuOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setActionMenuOpen(null)} role="presentation" />
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setShowConfirmModal(null)} role="dialog" aria-modal="true">
          <div onClick={(e: React.MouseEvent) => e.stopPropagation()} role="presentation" className="bg-[#0a0a0a] border border-white/10 w-full max-w-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              {showConfirmModal.action === 'ban' ? (
                <Ban className="w-5 h-5 text-red-400" />
              ) : (
                <Pause className="w-5 h-5 text-amber-400" />
              )}
              <h3 className="text-white text-sm font-medium">{showConfirmModal.label}</h3>
            </div>
            <p className="text-white/50 text-sm mb-6">
              {showConfirmModal.action === 'ban' 
                ? t("dash.adminUsers.banDesc")
                : t("dash.adminUsers.suspendDesc")}
            </p>
            <div className="flex items-center gap-3 justify-end">
              <button
                onClick={() => setShowConfirmModal(null)}
                className="px-4 py-2 text-sm text-white/60 hover:text-white border border-white/10 hover:border-white/20 transition-colors"
              >
                {t("dash.adminUsers.cancel")}
              </button>
              <button
                onClick={confirmAction}
                disabled={actionLoading !== null}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  showConfirmModal.action === 'ban' 
                    ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30' 
                    : 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border border-amber-500/30'
                }`}
              >
                {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : t("dash.adminUsers.confirm")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Detail Modal */}
      {showUserModal && selectedUser && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setShowUserModal(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            role="presentation"
            className="bg-[#0a0a0a] border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-hidden"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/70 text-lg font-light">
                  {selectedUser.first_name?.[0] || selectedUser.email[0].toUpperCase()}
                </div>
                <div>
                  <h2 className="text-lg font-light text-white">
                    {selectedUser.first_name} {selectedUser.last_name}
                  </h2>
                  <p className="text-white/50 text-sm">{selectedUser.email}</p>
                </div>
              </div>
              <button
                onClick={() => setShowUserModal(false)}
                className="p-2 hover:bg-white/[0.04] transition-colors"
              >
                <X className="w-4 h-4 text-white/50" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-white/50 uppercase tracking-widest mb-2">{t("dash.adminUsers.roleLabel")}</label>
                  <select
                    value={selectedUser.role}
                    onChange={(e) => updateUserRole(selectedUser.id, e.target.value as UserRole)}
                    className="w-full bg-white/[0.02] border border-white/[0.06] px-4 py-3 text-sm text-white focus:outline-none focus:border-white/10"
                  >
                    {roleOptions.map((role) => (
                      <option key={role.value} value={role.value} className="bg-black">
                        {role.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-white/50 uppercase tracking-widest mb-2">{t("dash.adminUsers.statusLabel")}</label>
                  <select
                    value={selectedUser.status}
                    onChange={(e) => updateUserStatus(selectedUser.id, e.target.value as UserStatus)}
                    className="w-full bg-white/[0.02] border border-white/[0.06] px-4 py-3 text-sm text-white focus:outline-none focus:border-white/10"
                  >
                    {statusOptions.map((status) => (
                      <option key={status.value} value={status.value} className="bg-black">
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>


              {/* User Info */}
              <div>
                <p className="text-[10px] text-white/50 uppercase tracking-widest mb-4">{t("dash.adminUsers.info")}</p>
                <div className="grid grid-cols-2 gap-px bg-white/[0.06]">
                  <div className="flex items-center gap-3 p-4 bg-[#0a0a0a]">
                    <Mail className="w-4 h-4 text-white/40" />
                    <div>
                      <p className="text-white/40 text-[10px] uppercase tracking-wider">{t("dash.adminUsers.email")}</p>
                      <p className="text-white/80 text-sm font-light">{selectedUser.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-[#0a0a0a]">
                    <Clock className="w-4 h-4 text-white/40" />
                    <div>
                      <p className="text-white/40 text-[10px] uppercase tracking-wider">{t("dash.adminUsers.registered")}</p>
                      <p className="text-white/80 text-sm font-light">
                        {format(new Date(selectedUser.created_at), "dd MMM yyyy HH:mm", { locale: dateFnsLocale })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sessions */}
              <div>
                <p className="text-[10px] text-white/50 uppercase tracking-widest mb-4">{t("dash.adminUsers.recentSessions")}</p>
                {userSessions.length === 0 ? (
                  <p className="text-white/40 text-sm">{t("dash.adminUsers.noSession")}</p>
                ) : (
                  <div className="border border-white/[0.06]">
                    {userSessions.map((session, index) => (
                      <div
                        key={session.id}
                        className={`flex items-center gap-4 p-4 ${index !== userSessions.length - 1 ? 'border-b border-white/[0.04]' : ''}`}
                      >
                        <div className="text-white/40">
                          {session.device === "mobile" ? (
                            <Smartphone className="w-4 h-4" />
                          ) : (
                            <Monitor className="w-4 h-4" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-white/70 text-sm font-light">
                            {session.browser || t("dash.adminUsers.unknownBrowser")} - {session.os || t("dash.adminUsers.unknownOS")}
                          </p>
                          <div className="flex items-center gap-2 text-white/40 text-xs">
                            <Globe className="w-3 h-3" />
                            {session.ip_address || t("dash.adminUsers.unknownIP")}
                            {session.country && ` - ${session.country}`}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white/50 text-xs">
                            {format(new Date(session.started_at), "dd MMM HH:mm", { locale: dateFnsLocale })}
                          </p>
                          {session.is_active && (
                            <span className="text-white/60 text-[10px] uppercase tracking-wider">{t("dash.adminUsers.sessionActive")}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

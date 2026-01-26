"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Search,
  Shield,
  Code,
  UserCog,
  Unlock,
  Lock,
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
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import type { User, UserRole, UserStatus, UserSession } from "@/types/database";

const roleOptions: { value: UserRole; label: string; icon: React.ReactNode }[] = [
  { value: "user", label: "Utilisateur", icon: <Users className="w-4 h-4" /> },
  { value: "staff", label: "Staff", icon: <UserCog className="w-4 h-4" /> },
  { value: "dev", label: "Développeur", icon: <Code className="w-4 h-4" /> },
  { value: "admin", label: "Admin", icon: <Shield className="w-4 h-4" /> },
];

const statusOptions: { value: UserStatus; label: string; color: string }[] = [
  { value: "pending", label: "En attente", color: "amber" },
  { value: "active", label: "Actif", color: "emerald" },
  { value: "suspended", label: "Suspendu", color: "red" },
  { value: "banned", label: "Banni", color: "red" },
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userSessions, setUserSessions] = useState<UserSession[]>([]);
  const [showUserModal, setShowUserModal] = useState(false);
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

  const updateUserRole = async (userId: string, newRole: UserRole) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) throw new Error('Failed to update role');

      loadUsers();
      if (selectedUser?.id === userId) {
        setSelectedUser({ ...selectedUser, role: newRole });
      }
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const updateUserStatus = async (userId: string, newStatus: UserStatus) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update status');

      loadUsers();
      if (selectedUser?.id === userId) {
        setSelectedUser({ ...selectedUser, status: newStatus });
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const toggleFeatures = async (userId: string, unlock: boolean) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ features_unlocked: unlock }),
      });

      if (!response.ok) throw new Error('Failed to toggle features');

      loadUsers();
      if (selectedUser?.id === userId) {
        setSelectedUser({ ...selectedUser, features_unlocked: unlock });
      }
    } catch (error) {
      console.error("Error toggling features:", error);
    }
  };

  const getStatusBadge = (status: string) => {
    const labels: Record<string, string> = {
      active: "Actif",
      pending: "En attente",
      suspended: "Suspendu",
      banned: "Banni",
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
        <p className="text-[10px] text-white/50 uppercase tracking-widest mb-2">Administration</p>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-light text-white">Gestion des utilisateurs</h1>
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
              placeholder="Rechercher par email, nom..."
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
            <option value="all" className="bg-black">Tous les roles</option>
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
            <option value="all" className="bg-black">Tous les statuts</option>
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
            <p className="text-sm">Aucun utilisateur trouve</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 text-[10px] text-white/50 font-normal uppercase tracking-widest">Utilisateur</th>
                  <th className="text-left p-4 text-[10px] text-white/50 font-normal uppercase tracking-widest">Role</th>
                  <th className="text-left p-4 text-[10px] text-white/50 font-normal uppercase tracking-widest">Statut</th>
                  <th className="text-left p-4 text-[10px] text-white/50 font-normal uppercase tracking-widest">Features</th>
                  <th className="text-left p-4 text-[10px] text-white/50 font-normal uppercase tracking-widest">Inscription</th>
                  <th className="text-left p-4 text-[10px] text-white/50 font-normal uppercase tracking-widest">Connexion</th>
                  <th className="text-right p-4 text-[10px] text-white/50 font-normal uppercase tracking-widest">Actions</th>
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
                    <td className="p-4">
                      {user.features_unlocked ? (
                        <span className="flex items-center gap-1.5 text-white/70 text-xs">
                          <Unlock className="w-3 h-3" /> Debloque
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-white/40 text-xs">
                          <Lock className="w-3 h-3" /> Verrouille
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-white/50 text-xs">
                      {format(new Date(user.created_at), "dd MMM yyyy", { locale: fr })}
                    </td>
                    <td className="p-4 text-white/50 text-xs">
                      {user.last_login_at
                        ? format(new Date(user.last_login_at), "dd MMM HH:mm", { locale: fr })
                        : "—"}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end">
                        <button
                          onClick={() => openUserModal(user)}
                          className="p-2 hover:bg-white/[0.04] transition-colors text-white/50 hover:text-white/80"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
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
              Page {currentPage} sur {totalPages}
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

      {/* User Detail Modal */}
      {showUserModal && selectedUser && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setShowUserModal(false)}
        >
          <div
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
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
                  <label className="block text-[10px] text-white/50 uppercase tracking-widest mb-2">Role</label>
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
                  <label className="block text-[10px] text-white/50 uppercase tracking-widest mb-2">Statut</label>
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

              {/* Features Toggle */}
              <div className="p-5 border border-white/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm font-light">Fonctionnalites avancees</p>
                    <p className="text-white/40 text-xs">
                      Projets, contrats, planning...
                    </p>
                  </div>
                  <button
                    onClick={() => toggleFeatures(selectedUser.id, !selectedUser.features_unlocked)}
                    className={`
                      px-4 py-2 text-sm font-medium transition-colors border
                      ${selectedUser.features_unlocked
                        ? "border-white/20 text-white/70 hover:bg-white/[0.02]"
                        : "bg-white text-black hover:bg-white/90"
                      }
                    `}
                  >
                    {selectedUser.features_unlocked ? "Verrouiller" : "Debloquer"}
                  </button>
                </div>
              </div>

              {/* User Info */}
              <div>
                <p className="text-[10px] text-white/50 uppercase tracking-widest mb-4">Informations</p>
                <div className="grid grid-cols-2 gap-px bg-white/[0.06]">
                  <div className="flex items-center gap-3 p-4 bg-[#0a0a0a]">
                    <Mail className="w-4 h-4 text-white/40" />
                    <div>
                      <p className="text-white/40 text-[10px] uppercase tracking-wider">Email</p>
                      <p className="text-white/80 text-sm font-light">{selectedUser.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-[#0a0a0a]">
                    <Clock className="w-4 h-4 text-white/40" />
                    <div>
                      <p className="text-white/40 text-[10px] uppercase tracking-wider">Inscription</p>
                      <p className="text-white/80 text-sm font-light">
                        {format(new Date(selectedUser.created_at), "dd MMM yyyy HH:mm", { locale: fr })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sessions */}
              <div>
                <p className="text-[10px] text-white/50 uppercase tracking-widest mb-4">Sessions recentes</p>
                {userSessions.length === 0 ? (
                  <p className="text-white/40 text-sm">Aucune session enregistree</p>
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
                            {session.browser || "Navigateur inconnu"} - {session.os || "OS inconnu"}
                          </p>
                          <div className="flex items-center gap-2 text-white/40 text-xs">
                            <Globe className="w-3 h-3" />
                            {session.ip_address || "IP inconnue"}
                            {session.country && ` - ${session.country}`}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white/50 text-xs">
                            {format(new Date(session.started_at), "dd MMM HH:mm", { locale: fr })}
                          </p>
                          {session.is_active && (
                            <span className="text-white/60 text-[10px] uppercase tracking-wider">Active</span>
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

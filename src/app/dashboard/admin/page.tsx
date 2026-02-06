"use client";

import { useEffect, useState } from "react";
import {
  Users,
  MessageSquare,
  FileText,
  FolderKanban,
  Activity,
  Eye,
  ArrowRight,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";
import { format } from "date-fns";
import { fr, enUS } from "date-fns/locale";
import { useLocale } from "@/contexts";

interface Stats {
  totalUsers: number;
  activeUsers: number;
  pendingUsers: number;
  totalConversations: number;
  openConversations: number;
  totalDocuments: number;
  totalProjects: number;
  todayLogins: number;
}

interface RecentUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  status: string;
  created_at: string;
}

interface ActivityUser {
  email: string;
  first_name: string;
}

interface RecentActivity {
  id: string;
  action: string;
  entity_type: string;
  created_at: string;
  user?: ActivityUser | ActivityUser[];
}

export default function AdminDashboard() {
  const { locale, t } = useLocale();
  const dateFnsLocale = locale === 'fr' ? fr : enUS;
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    activeUsers: 0,
    pendingUsers: 0,
    totalConversations: 0,
    openConversations: 0,
    totalDocuments: 0,
    totalProjects: 0,
    todayLogins: 0,
  });
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
    
    // Real-time subscription for users
    const channel = supabase
      .channel("admin-dashboard")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "users" },
        () => loadDashboardData()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const safeCount = async (table: string, filters?: Record<string, unknown>) => {
    try {
      let query = supabase.from(table).select("*", { count: "exact", head: true });
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (key === 'gte') {
            const [col, val] = Object.entries(value as Record<string, string>)[0];
            query = query.gte(col, val);
          } else {
            query = query.eq(key, value);
          }
        });
      }
      const { count } = await query;
      return count || 0;
    } catch {
      return 0;
    }
  };

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Get all counts with graceful error handling
      const [
        totalUsers,
        activeUsers,
        pendingUsers,
        totalConversations,
        openConversations,
        totalDocuments,
        totalProjects,
        todayLogins,
      ] = await Promise.all([
        safeCount("users"),
        safeCount("users", { status: "active" }),
        safeCount("users", { status: "pending" }),
        safeCount("conversations"),
        safeCount("conversations", { status: "open" }),
        safeCount("documents"),
        safeCount("projects"),
        safeCount("user_sessions", { gte: { started_at: today.toISOString() } }),
      ]);

      setStats({
        totalUsers,
        activeUsers,
        pendingUsers,
        totalConversations,
        openConversations,
        totalDocuments,
        totalProjects,
        todayLogins,
      });

      // Get recent users
      try {
        const { data: users } = await supabase
          .from("users")
          .select("id, email, first_name, last_name, role, status, created_at")
          .order("created_at", { ascending: false })
          .limit(5);
        setRecentUsers(users || []);
      } catch {
        setRecentUsers([]);
      }

      // Get recent activity
      try {
        const { data: activity } = await supabase
          .from("audit_logs")
          .select(`
            id, action, entity_type, created_at,
            user:users(email, first_name)
          `)
          .order("created_at", { ascending: false })
          .limit(10);
        setRecentActivity(activity || []);
      } catch {
        setRecentActivity([]);
      }
    } catch (error: unknown) {
      const err = error as { message?: string };
      if (!err.message?.includes('does not exist')) {
        console.error("Error loading dashboard data:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: t("dash.admin.users"),
      value: stats.totalUsers,
      subValue: `${stats.activeUsers} ${t("dash.admin.active")}`,
      icon: <Users className="w-4 h-4" />,
      extra: stats.pendingUsers > 0 ? `+${stats.pendingUsers} ${t("dash.admin.pending")}` : null,
    },
    {
      title: t("dash.admin.conversations"),
      value: stats.totalConversations,
      subValue: `${stats.openConversations} ${t("dash.admin.openConv")}`,
      icon: <MessageSquare className="w-4 h-4" />,
    },
    {
      title: t("dash.admin.documents"),
      value: stats.totalDocuments,
      subValue: `${stats.totalDocuments} ${t("dash.admin.filesUploaded")}`,
      icon: <FileText className="w-4 h-4" />,
    },
    {
      title: t("dash.admin.projects"),
      value: stats.totalProjects,
      subValue: `${stats.totalProjects} ${t("dash.admin.projectsCreated")}`,
      icon: <FolderKanban className="w-4 h-4" />,
    },
    {
      title: t("dash.admin.connections"),
      value: stats.todayLogins,
      subValue: t("dash.admin.today"),
      icon: <Activity className="w-4 h-4" />,
    },
  ];

  const getStatusBadge = (status: string) => {
    const labels: Record<string, string> = {
      active: t("dash.admin.status.active"),
      pending: t("dash.admin.status.pending"),
      suspended: t("dash.admin.status.suspended"),
      banned: t("dash.admin.status.banned"),
    };
    return (
      <span className="text-[10px] text-white/40 uppercase tracking-wider">
        {labels[status] || status}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-4 h-4 border border-white/20 border-t-white/60 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2">{t("dash.admin.system")}</p>
        <h1 className="text-xl font-light text-white">{t("dash.admin.title")}</h1>
      </div>

      {/* Stats Grid */}
      <div className="border border-white/10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {statCards.map((stat) => (
          <div
            key={stat.title}
            className="p-6 bg-[#0a0a0a]"
          >
            <div className="flex items-center gap-2 mb-4 text-white/40">
              {stat.icon}
              <span className="text-[10px] uppercase tracking-widest">{stat.title}</span>
            </div>
            <p className="text-2xl font-light text-white/90 mb-1">{stat.value}</p>
            <p className="text-white/40 text-xs">{stat.subValue}</p>
            {stat.extra && (
              <p className="text-white/30 text-xs mt-1">{stat.extra}</p>
            )}
          </div>
        ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="border border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Recent Users */}
        <div className="p-6 bg-[#0a0a0a]">
          <div className="flex items-center justify-between mb-6">
            <p className="text-[10px] text-white/40 uppercase tracking-widest">{t("dash.admin.newUsers")}</p>
            <Link
              href="/dashboard/admin/users"
              className="text-xs text-white/40 hover:text-white/70 transition-colors flex items-center gap-1"
            >
              {t("dash.admin.viewAll")} <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-px">
            {recentUsers.length === 0 ? (
              <p className="text-white/40 text-sm">{t("dash.admin.noUser")}</p>
            ) : (
              recentUsers.map((user, index) => (
                <div
                  key={user.id}
                  className={`flex items-center justify-between p-3 bg-white/[0.02] ${index !== recentUsers.length - 1 ? 'border-b border-white/[0.04]' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/60 text-sm font-light">
                      {user.first_name?.[0] || user.email[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white/70 text-sm font-light">
                        {user.first_name} {user.last_name}
                      </p>
                      <p className="text-white/30 text-xs">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(user.status)}
                    <p className="text-white/20 text-[10px] mt-1">
                      {format(new Date(user.created_at), 'dd MMM yyyy', { locale: dateFnsLocale })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="p-6 bg-[#0a0a0a]">
          <div className="flex items-center justify-between mb-6">
            <p className="text-[10px] text-white/40 uppercase tracking-widest">{t("dash.admin.recentActivity")}</p>
            <Link
              href="/dashboard/admin/logs"
              className="text-xs text-white/40 hover:text-white/70 transition-colors flex items-center gap-1"
            >
              {t("dash.admin.viewAll")} <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-px">
            {recentActivity.length === 0 ? (
              <p className="text-white/40 text-sm">{t("dash.admin.noActivity")}</p>
            ) : (
              recentActivity.map((activity, index) => {
                const userData = Array.isArray(activity.user) ? activity.user[0] : activity.user;
                return (
                  <div
                    key={activity.id}
                    className={`flex items-start gap-3 p-3 bg-white/[0.02] ${index !== recentActivity.length - 1 ? 'border-b border-white/[0.04]' : ''}`}
                  >
                    <Activity className="w-3 h-3 text-white/30 mt-1" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white/60 text-sm font-light">
                        <span className="text-white/70">
                          {userData?.first_name || userData?.email || "Systeme"}
                        </span>{" "}
                        {activity.action}
                      </p>
                      <p className="text-white/30 text-xs">
                        {activity.entity_type} - {format(new Date(activity.created_at), 'HH:mm', { locale: dateFnsLocale })}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      </div>

      {/* Quick Actions */}
      <div className="border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3">
        <Link
          href="/dashboard/admin/users"
          className="p-6 bg-[#0a0a0a] hover:bg-white/[0.02] transition-colors group"
        >
          <Users className="w-4 h-4 text-white/40 mb-4 group-hover:text-white/60 transition-colors" />
          <h2 className="text-white/70 text-sm font-light">{t("dash.admin.newUsers")}</h2>
          <span className="text-white/40 text-xs hover:text-white/70 transition-colors">
            {t("dash.admin.viewAll")} →
          </span>
        </Link>

        <Link
          href="/dashboard/admin/analytics"
          className="p-6 bg-[#0a0a0a] hover:bg-white/[0.02] transition-colors group"
        >
          <Activity className="w-4 h-4 text-white/40 mb-4 group-hover:text-white/60 transition-colors" />
          <h3 className="text-white/70 text-sm font-light mb-1">{t("dash.admin.analyticsTitle")}</h3>
          <p className="text-white/30 text-xs">{t("dash.admin.analyticsDesc")}</p>
        </Link>

        <Link
          href="/dashboard/admin/logs"
          className="p-6 bg-[#0a0a0a] hover:bg-white/[0.02] transition-colors group"
        >
          <Eye className="w-4 h-4 text-white/40 mb-4 group-hover:text-white/60 transition-colors" />
          <h2 className="text-white/70 text-sm font-light">{t("dash.admin.recentActivity")}</h2>
          <p className="text-white/30 text-xs">{t("dash.admin.recentActivityDesc")}</p>
        </Link>
        </div>
      </div>
    </div>
  );
}

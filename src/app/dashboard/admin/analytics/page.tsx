"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Eye,
  Clock,
  MousePointer,
  Activity,
  FileText,
  MessageSquare,
  FolderKanban,
  Settings,
  Trash2,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { subDays } from "date-fns";
import { useLocale } from "@/contexts";

interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  entity_type: string;
  new_values: Record<string, unknown> | null;
  old_values: Record<string, unknown> | null;
  created_at: string;
  user?: { email: string; first_name: string; last_name: string } | null;
}

interface AnalyticsData {
  totalPageViews: number;
  uniqueVisitors: number;
  avgTimeOnPage: number;
  totalActions: number;
  topPages: { page: string; views: number }[];
  actionBreakdown: { action: string; count: number }[];
  topUsers: { email: string; name: string; count: number }[];
  entityBreakdown: { entity: string; count: number }[];
}

export default function AnalyticsPage() {
  const { locale, t } = useLocale();
  const [data, setData] = useState<AnalyticsData>({
    totalPageViews: 0,
    uniqueVisitors: 0,
    avgTimeOnPage: 0,
    totalActions: 0,
    topPages: [],
    actionBreakdown: [],
    topUsers: [],
    entityBreakdown: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState(7);

  useEffect(() => {
    loadAnalytics();
  }, [dateRange]);

  const loadAnalytics = async () => {
    setIsLoading(true);
    try {
      const startDate = subDays(new Date(), dateRange).toISOString();

      const { data: logs, error } = await supabase
        .from("audit_logs")
        .select("*, user:users(email, first_name, last_name)")
        .gte("created_at", startDate)
        .order("created_at", { ascending: false })
        .limit(2000);

      if (error) throw error;
      const allLogs: AuditLog[] = logs || [];

      // Page views
      const pageViews = allLogs.filter((l) => l.action === "page_view");
      const totalPageViews = pageViews.length;

      // Unique visitors
      const uniqueVisitors = new Set(pageViews.map((l) => l.user_id)).size;

      // Avg time on page (from page_leave logs)
      const pageLeaves = allLogs.filter((l) => l.action === "page_leave");
      const totalTime = pageLeaves.reduce((sum, l) => {
        const t = (l.new_values as { time_spent_seconds?: number })?.time_spent_seconds || 0;
        return sum + t;
      }, 0);
      const avgTimeOnPage = pageLeaves.length > 0 ? Math.round(totalTime / pageLeaves.length) : 0;

      // Total actions (excluding page_view/page_leave)
      const actionLogs = allLogs.filter((l) => l.action !== "page_view" && l.action !== "page_leave");
      const totalActions = actionLogs.length;

      // Top pages
      const pageCount: Record<string, number> = {};
      pageViews.forEach((l) => {
        const page = (l.new_values as { page?: string })?.page || "unknown";
        pageCount[page] = (pageCount[page] || 0) + 1;
      });
      const topPages = Object.entries(pageCount)
        .map(([page, views]) => ({ page, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 8);

      // Action breakdown (excluding page_view/page_leave)
      const actionCount: Record<string, number> = {};
      actionLogs.forEach((l) => {
        actionCount[l.action] = (actionCount[l.action] || 0) + 1;
      });
      const actionBreakdown = Object.entries(actionCount)
        .map(([action, count]) => ({ action, count }))
        .sort((a, b) => b.count - a.count);

      // Top active users
      const userCount: Record<string, { email: string; name: string; count: number }> = {};
      allLogs.forEach((l) => {
        if (!l.user_id) return;
        const userData = Array.isArray(l.user) ? l.user[0] : l.user;
        const email = userData?.email || "unknown";
        const name = userData ? `${userData.first_name || ""} ${userData.last_name || ""}`.trim() : "?";
        if (!userCount[l.user_id]) {
          userCount[l.user_id] = { email, name, count: 0 };
        }
        userCount[l.user_id].count++;
      });
      const topUsers = Object.values(userCount)
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      // Entity breakdown
      const entityCount: Record<string, number> = {};
      actionLogs.forEach((l) => {
        entityCount[l.entity_type] = (entityCount[l.entity_type] || 0) + 1;
      });
      const entityBreakdown = Object.entries(entityCount)
        .map(([entity, count]) => ({ entity, count }))
        .sort((a, b) => b.count - a.count);

      setData({
        totalPageViews,
        uniqueVisitors,
        avgTimeOnPage,
        totalActions,
        topPages,
        actionBreakdown,
        topUsers,
        entityBreakdown,
      });
    } catch (error) {
      console.error("Error loading analytics:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getActionIcon = (action: string) => {
    if (action.includes("message") || action.includes("assign")) return <MessageSquare className="w-4 h-4" />;
    if (action.includes("project") || action.includes("task") || action.includes("status")) return <FolderKanban className="w-4 h-4" />;
    if (action.includes("upload") || action.includes("document")) return <FileText className="w-4 h-4" />;
    if (action.includes("delete")) return <Trash2 className="w-4 h-4" />;
    if (action.includes("setting") || action.includes("update")) return <Settings className="w-4 h-4" />;
    return <Activity className="w-4 h-4" />;
  };

  const getActionColor = (action: string) => {
    if (action.includes("create") || action === "upload" || action === "send_message" || action === "contact_user") return "text-green-400";
    if (action.includes("update") || action.includes("assign")) return "text-yellow-400";
    if (action.includes("delete")) return "text-red-400";
    if (action === "archive" || action === "unarchive") return "text-purple-400";
    return "text-blue-400";
  };

  const statCards = [
    {
      title: t("dash.analytics.pageViews"),
      value: data.totalPageViews,
      icon: <Eye className="w-6 h-6" />,
      color: "from-blue-500/20 to-blue-600/20",
    },
    {
      title: t("dash.analytics.uniqueVisitors"),
      value: data.uniqueVisitors,
      icon: <Users className="w-6 h-6" />,
      color: "from-purple-500/20 to-purple-600/20",
    },
    {
      title: t("dash.analytics.avgDuration"),
      value: `${avgTimeFormatted(data.avgTimeOnPage)}`,
      icon: <Clock className="w-6 h-6" />,
      color: "from-emerald-500/20 to-emerald-600/20",
    },
    {
      title: locale === "fr" ? "Actions" : "Actions",
      value: data.totalActions,
      icon: <MousePointer className="w-6 h-6" />,
      color: "from-amber-500/20 to-amber-600/20",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light text-white">{t("dash.analytics.title")}</h1>
          <p className="text-white/50">{t("dash.analytics.subtitle")}</p>
        </div>

        <select
          value={dateRange}
          onChange={(e) => setDateRange(Number(e.target.value))}
          className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-white/20"
        >
          <option value={7} className="bg-black">{t("dash.analytics.days7")}</option>
          <option value={30} className="bg-black">{t("dash.analytics.days30")}</option>
          <option value={90} className="bg-black">{t("dash.analytics.days90")}</option>
        </select>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 rounded-xl border border-white/10 bg-gradient-to-br ${stat.color}`}
          >
            <div className="p-3 bg-white/10 rounded-lg text-white w-fit mb-4">
              {stat.icon}
            </div>
            <p className="text-3xl font-light text-white mb-1">{stat.value}</p>
            <p className="text-white/50 text-sm">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-xl border border-white/10 bg-white/[0.02]"
        >
          <h2 className="text-lg font-medium text-white mb-6">{t("dash.analytics.topPages")}</h2>

          {data.topPages.length === 0 ? (
            <p className="text-white/40 text-center py-8">{t("dash.analytics.noData")}</p>
          ) : (
            <div className="space-y-3">
              {data.topPages.map((page, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="text-white/30 text-sm w-6">{index + 1}</span>
                  <div className="flex-1">
                    <p className="text-white text-sm truncate">{page.page}</p>
                    <div className="mt-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-400/60 rounded-full"
                        style={{
                          width: `${(page.views / data.topPages[0].views) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-white/50 text-sm font-mono">{page.views}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Actions Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-xl border border-white/10 bg-white/[0.02]"
        >
          <h2 className="text-lg font-medium text-white mb-6">
            {locale === "fr" ? "Actions par type" : "Actions by type"}
          </h2>

          {data.actionBreakdown.length === 0 ? (
            <p className="text-white/40 text-center py-8">{t("dash.analytics.noData")}</p>
          ) : (
            <div className="space-y-3">
              {data.actionBreakdown.map((item) => (
                <div key={item.action} className="flex items-center gap-3 p-2.5 bg-white/[0.03] border border-white/[0.06]">
                  <div className={`${getActionColor(item.action)}`}>
                    {getActionIcon(item.action)}
                  </div>
                  <div className="flex-1">
                    <span className={`text-sm font-mono ${getActionColor(item.action)}`}>{item.action}</span>
                  </div>
                  <span className="text-white/60 text-sm font-mono">{item.count}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Top Active Users */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-6 rounded-xl border border-white/10 bg-white/[0.02]"
        >
          <h2 className="text-lg font-medium text-white mb-6">
            {locale === "fr" ? "Utilisateurs les plus actifs" : "Most active users"}
          </h2>

          {data.topUsers.length === 0 ? (
            <p className="text-white/40 text-center py-8">{t("dash.analytics.noData")}</p>
          ) : (
            <div className="space-y-3">
              {data.topUsers.map((u, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/[0.06]">
                  <div className="w-8 h-8 bg-white/10 flex items-center justify-center text-xs text-white/60 font-medium">
                    {u.name?.[0] || u.email?.[0] || "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm truncate">{u.name || u.email}</p>
                    <p className="text-white/40 text-xs truncate">{u.email}</p>
                  </div>
                  <span className="text-white/60 text-sm font-mono">{u.count} <span className="text-white/30 text-xs">actions</span></span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Entity Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="p-6 rounded-xl border border-white/10 bg-white/[0.02]"
        >
          <h2 className="text-lg font-medium text-white mb-6">
            {locale === "fr" ? "Actions par entité" : "Actions by entity"}
          </h2>

          {data.entityBreakdown.length === 0 ? (
            <p className="text-white/40 text-center py-8">{t("dash.analytics.noData")}</p>
          ) : (
            <div className="space-y-3">
              {data.entityBreakdown.map((item) => (
                <div key={item.entity} className="flex items-center gap-4">
                  <span className="text-xs px-2 py-1 bg-white/5 border border-white/10 text-white/50 w-28 text-center">{item.entity}</span>
                  <div className="flex-1">
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white/30 rounded-full"
                        style={{
                          width: `${(item.count / data.entityBreakdown[0].count) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-white/60 text-sm font-mono w-10 text-right">{item.count}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function avgTimeFormatted(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return sec > 0 ? `${min}m${sec}s` : `${min}min`;
}

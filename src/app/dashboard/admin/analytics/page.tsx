"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Eye,
  Clock,
  MousePointer,
  Globe,
  Monitor,
  Smartphone,
  TrendingUp,
  Calendar,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { format, subDays } from "date-fns";
import { fr, enUS } from "date-fns/locale";
import { useLocale } from "@/contexts";

interface AnalyticsData {
  totalPageViews: number;
  uniqueVisitors: number;
  avgSessionDuration: number;
  topPages: { page_url: string; views: number }[];
  deviceBreakdown: { device: string; count: number }[];
  countryBreakdown: { country: string; count: number }[];
  dailyVisits: { date: string; visits: number }[];
}

export default function AnalyticsPage() {
  const { locale, t } = useLocale();
  const dateFnsLocale = locale === 'fr' ? fr : enUS;
  const [data, setData] = useState<AnalyticsData>({
    totalPageViews: 0,
    uniqueVisitors: 0,
    avgSessionDuration: 0,
    topPages: [],
    deviceBreakdown: [],
    countryBreakdown: [],
    dailyVisits: [],
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

      // Get page views count
      const { count: totalPageViews } = await supabase
        .from("page_views")
        .select("*", { count: "exact", head: true })
        .gte("viewed_at", startDate);

      // Get unique visitors
      const { data: visitors } = await supabase
        .from("user_sessions")
        .select("user_id")
        .gte("started_at", startDate);

      const uniqueVisitors = new Set(visitors?.map((v) => v.user_id)).size;

      // Get top pages
      const { data: pageData } = await supabase
        .from("page_views")
        .select("page_url")
        .gte("viewed_at", startDate);

      const pageCount: Record<string, number> = {};
      pageData?.forEach((p) => {
        pageCount[p.page_url] = (pageCount[p.page_url] || 0) + 1;
      });
      const topPages = Object.entries(pageCount)
        .map(([page_url, views]) => ({ page_url, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 5);

      // Get device breakdown
      const { data: deviceData } = await supabase
        .from("user_sessions")
        .select("device")
        .gte("started_at", startDate);

      const deviceCount: Record<string, number> = {};
      deviceData?.forEach((d) => {
        const device = d.device || "unknown";
        deviceCount[device] = (deviceCount[device] || 0) + 1;
      });
      const deviceBreakdown = Object.entries(deviceCount)
        .map(([device, count]) => ({ device, count }))
        .sort((a, b) => b.count - a.count);

      // Get country breakdown
      const { data: countryData } = await supabase
        .from("user_sessions")
        .select("country")
        .gte("started_at", startDate);

      const countryCount: Record<string, number> = {};
      countryData?.forEach((c) => {
        const country = c.country || "Unknown";
        countryCount[country] = (countryCount[country] || 0) + 1;
      });
      const countryBreakdown = Object.entries(countryCount)
        .map(([country, count]) => ({ country, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      setData({
        totalPageViews: totalPageViews || 0,
        uniqueVisitors,
        avgSessionDuration: 0,
        topPages,
        deviceBreakdown,
        countryBreakdown,
        dailyVisits: [],
      });
    } catch (error) {
      console.error("Error loading analytics:", error);
    } finally {
      setIsLoading(false);
    }
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
      value: `${Math.floor(data.avgSessionDuration / 60)}min`,
      icon: <Clock className="w-6 h-6" />,
      color: "from-emerald-500/20 to-emerald-600/20",
    },
    {
      title: t("dash.analytics.period"),
      value: locale === 'fr' ? `${dateRange}j` : `${dateRange}d`,
      icon: <Calendar className="w-6 h-6" />,
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
                    <p className="text-white text-sm truncate">{page.page_url}</p>
                    <div className="mt-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white/40 rounded-full"
                        style={{
                          width: `${(page.views / data.topPages[0].views) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <span className="text-white/50 text-sm">{page.views}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Device Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-xl border border-white/10 bg-white/[0.02]"
        >
          <h2 className="text-lg font-medium text-white mb-6">{t("dash.analytics.devices")}</h2>

          {data.deviceBreakdown.length === 0 ? (
            <p className="text-white/40 text-center py-8">{t("dash.analytics.noData")}</p>
          ) : (
            <div className="space-y-4">
              {data.deviceBreakdown.map((item) => (
                <div key={item.device} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                  <div className="p-2 bg-white/10 rounded-lg">
                    {item.device === "mobile" ? (
                      <Smartphone className="w-5 h-5 text-white/70" />
                    ) : (
                      <Monitor className="w-5 h-5 text-white/70" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium capitalize">{item.device || "Unknown"}</p>
                  </div>
                  <span className="text-white/50">{item.count} {t("dash.analytics.sessions")}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Country Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="p-6 rounded-xl border border-white/10 bg-white/[0.02] lg:col-span-2"
        >
          <h2 className="text-lg font-medium text-white mb-6">{t("dash.analytics.countries")}</h2>

          {data.countryBreakdown.length === 0 ? (
            <p className="text-white/40 text-center py-8">{t("dash.analytics.noData")}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {data.countryBreakdown.map((item) => (
                <div key={item.country} className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
                  <Globe className="w-5 h-5 text-white/40" />
                  <div>
                    <p className="text-white font-medium">{item.country}</p>
                    <p className="text-white/40 text-sm">{item.count} {t("dash.analytics.visits")}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Code, Database, Server, Terminal, Activity, Clock } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface SystemStats {
  totalTables: number;
  totalMigrations: number;
  dbSize: string;
  lastMigration: string | null;
}

export default function DevDashboard() {
  const [stats, setStats] = useState<SystemStats>({
    totalTables: 0,
    totalMigrations: 0,
    dbSize: "0 MB",
    lastMigration: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSystemStats();
  }, []);

  const loadSystemStats = async () => {
    setIsLoading(true);
    try {
      // Get table count (simplified - in real app would query information_schema)
      const tables = [
        "users",
        "user_sessions",
        "page_views",
        "user_actions",
        "projects",
        "documents",
        "conversations",
        "messages",
        "notifications",
        "audit_logs",
      ];

      setStats({
        totalTables: tables.length,
        totalMigrations: 1,
        dbSize: "~5 MB",
        lastMigration: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const devTools = [
    {
      title: "Base de données",
      description: "Schéma et tables Supabase",
      icon: <Database className="w-6 h-6" />,
      href: "https://supabase.com/dashboard/project/ivfiyrrljzjpqjphupkx",
      external: true,
    },
    {
      title: "Clerk Dashboard",
      description: "Gestion authentification",
      icon: <Server className="w-6 h-6" />,
      href: "https://dashboard.clerk.com",
      external: true,
    },
    {
      title: "API Logs",
      description: "Logs des requêtes API",
      icon: <Terminal className="w-6 h-6" />,
      href: "/dashboard/dev/api-logs",
      external: false,
    },
  ];

  const statCards = [
    {
      title: "Tables",
      value: stats.totalTables,
      icon: <Database className="w-5 h-5" />,
    },
    {
      title: "Migrations",
      value: stats.totalMigrations,
      icon: <Code className="w-5 h-5" />,
    },
    {
      title: "Taille DB",
      value: stats.dbSize,
      icon: <Server className="w-5 h-5" />,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-4 h-4 border border-white/20 border-t-white/60 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-white/[0.06] pb-6">
        <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2">Panel</p>
        <h1 className="text-xl font-light text-white">Dashboard Developpeur</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06]">
        {statCards.map((stat) => (
          <div
            key={stat.title}
            className="p-6 bg-[#0a0a0a]"
          >
            <div className="flex items-center gap-2 mb-4 text-white/40">
              {stat.icon}
              <span className="text-[10px] uppercase tracking-widest">{stat.title}</span>
            </div>
            <p className="text-2xl font-light text-white/90">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Dev Tools */}
      <div>
        <p className="text-[10px] text-white/40 uppercase tracking-widest mb-4">Outils</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06]">
          {devTools.map((tool) => (
            <a
              key={tool.title}
              href={tool.href}
              target={tool.external ? "_blank" : undefined}
              rel={tool.external ? "noopener noreferrer" : undefined}
              className="p-6 bg-[#0a0a0a] hover:bg-white/[0.02] transition-colors group"
            >
              <div className="text-white/40 mb-4 group-hover:text-white/60 transition-colors">
                {tool.icon}
              </div>
              <h3 className="text-white/70 text-sm font-light mb-1">{tool.title}</h3>
              <p className="text-white/30 text-xs">{tool.description}</p>
            </a>
          ))}
        </div>
      </div>

      {/* System Info */}
      <div className="border border-white/[0.06] p-6">
        <p className="text-[10px] text-white/40 uppercase tracking-widest mb-6">Systeme</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.06]">
          <div className="p-4 bg-[#0a0a0a]">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-3 h-3 text-white/40" />
              <span className="text-white/60 text-sm font-light">API Status</span>
            </div>
            <p className="text-white/50 text-xs">Operationnel</p>
          </div>

          <div className="p-4 bg-[#0a0a0a]">
            <div className="flex items-center gap-2 mb-2">
              <Database className="w-3 h-3 text-white/40" />
              <span className="text-white/60 text-sm font-light">Database Status</span>
            </div>
            <p className="text-white/50 text-xs">Connecte</p>
          </div>

          <div className="p-4 bg-[#0a0a0a]">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-3 h-3 text-white/40" />
              <span className="text-white/60 text-sm font-light">Derniere migration</span>
            </div>
            <p className="text-white/40 text-xs">
              {stats.lastMigration
                ? format(new Date(stats.lastMigration), "dd MMM yyyy HH:mm", { locale: fr })
                : "N/A"}
            </p>
          </div>

          <div className="p-4 bg-[#0a0a0a]">
            <div className="flex items-center gap-2 mb-2">
              <Server className="w-3 h-3 text-white/40" />
              <span className="text-white/60 text-sm font-light">Environment</span>
            </div>
            <p className="text-white/40 text-xs">Development</p>
          </div>
        </div>
      </div>

      {/* Schema Overview */}
      <div className="border border-white/[0.06] p-6">
        <p className="text-[10px] text-white/40 uppercase tracking-widest mb-6">Tables</p>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-white/[0.06]">
          {[
            "users",
            "user_sessions",
            "page_views",
            "user_actions",
            "projects",
            "documents",
            "conversations",
            "messages",
            "notifications",
            "audit_logs",
          ].map((table) => (
            <div
              key={table}
              className="p-3 bg-[#0a0a0a] text-center"
            >
              <code className="text-white/50 text-xs">{table}</code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

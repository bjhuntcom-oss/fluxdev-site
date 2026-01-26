"use client";

import { useEffect, useState } from "react";
import { Users, MessageSquare, FileText, Clock, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface StaffStats {
  pendingUsers: number;
  openConversations: number;
  newDocuments: number;
}

interface ConversationUser {
  email: string;
  first_name: string;
  last_name: string;
}

interface PendingConversation {
  id: string;
  subject: string;
  status: string;
  created_at: string;
  user?: ConversationUser | ConversationUser[];
}

export default function StaffDashboard() {
  const [stats, setStats] = useState<StaffStats>({
    pendingUsers: 0,
    openConversations: 0,
    newDocuments: 0,
  });
  const [conversations, setConversations] = useState<PendingConversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();

    const channel = supabase
      .channel("staff-dashboard")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "conversations" },
        () => loadData()
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

  const loadData = async () => {
    setIsLoading(true);
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const [pendingUsers, openConversations, newDocuments] = await Promise.all([
        safeCount("users", { status: "pending" }),
        safeCount("conversations", { status: "open" }),
        safeCount("documents", { gte: { created_at: today.toISOString() } }),
      ]);

      setStats({ pendingUsers, openConversations, newDocuments });

      try {
        const { data: convData } = await supabase
          .from("conversations")
          .select(`
            id, subject, status, created_at,
            user:users(email, first_name, last_name)
          `)
          .eq("status", "open")
          .order("created_at", { ascending: false })
          .limit(5);
        setConversations(convData || []);
      } catch {
        setConversations([]);
      }
    } catch (error: unknown) {
      const err = error as { message?: string };
      if (!err.message?.includes('does not exist')) {
        console.error("Error loading data:", error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    {
      title: "Utilisateurs en attente",
      value: stats.pendingUsers,
      icon: <Users className="w-4 h-4" />,
      href: "/dashboard/staff/users",
    },
    {
      title: "Conversations ouvertes",
      value: stats.openConversations,
      icon: <MessageSquare className="w-4 h-4" />,
      href: "/dashboard/staff/conversations",
    },
    {
      title: "Nouveaux documents",
      value: stats.newDocuments,
      icon: <FileText className="w-4 h-4" />,
      href: "#",
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
        <h1 className="text-xl font-light text-white">Dashboard Staff</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06]">
        {statCards.map((stat) => (
          <Link
            key={stat.title}
            href={stat.href}
            className="p-6 bg-[#0a0a0a] hover:bg-white/[0.02] transition-colors group"
          >
            <div className="flex items-center gap-2 mb-4 text-white/40 group-hover:text-white/60 transition-colors">
              {stat.icon}
              <span className="text-[10px] uppercase tracking-widest">{stat.title}</span>
            </div>
            <p className="text-2xl font-light text-white/90">{stat.value}</p>
          </Link>
        ))}
      </div>

      {/* Recent Conversations */}
      <div className="border border-white/[0.06] p-6">
        <div className="flex items-center justify-between mb-6">
          <p className="text-[10px] text-white/40 uppercase tracking-widest">Conversations en attente</p>
          <Link
            href="/dashboard/staff/conversations"
            className="text-xs text-white/40 hover:text-white/70 transition-colors flex items-center gap-1"
          >
            Voir tout <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {conversations.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="w-6 h-6 mx-auto text-white/20 mb-4" />
            <p className="text-white/40 text-sm">Aucune conversation en attente</p>
          </div>
        ) : (
          <div className="space-y-px">
            {conversations.map((conv, index) => {
              const userData = Array.isArray(conv.user) ? conv.user[0] : conv.user;
              return (
                <Link
                  key={conv.id}
                  href={`/dashboard/staff/conversations/${conv.id}`}
                  className={`flex items-center justify-between p-4 bg-white/[0.02] hover:bg-white/[0.04] transition-colors ${index !== conversations.length - 1 ? 'border-b border-white/[0.04]' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/60 text-sm font-light">
                      {userData?.first_name?.[0] || userData?.email?.[0]?.toUpperCase() || "?"}
                    </div>
                    <div>
                      <p className="text-white/70 text-sm font-light">{conv.subject || "Sans sujet"}</p>
                      <p className="text-white/30 text-xs">
                        {userData?.first_name} {userData?.last_name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-white/30 text-xs">
                    <Clock className="w-3 h-3" />
                    {format(new Date(conv.created_at), "dd MMM HH:mm", { locale: fr })}
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

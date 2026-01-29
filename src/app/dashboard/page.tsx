"use client";

import { useUser } from "@clerk/nextjs";
import { 
  MessageSquare, 
  FileText, 
  FolderKanban, 
  ArrowRight,
  Check,
  Loader2
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

interface QuickAction {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  count?: number;
}

interface DashboardStats {
  unreadMessages: number;
  documentsCount: number;
  projectsCount: number;
}

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [stats, setStats] = useState<DashboardStats>({
    unreadMessages: 0,
    documentsCount: 0,
    projectsCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && user) {
      loadUserStats(user.id);
    }
  }, [isLoaded, user]);

  const loadUserStats = async (clerkId: string) => {
    setIsLoading(true);
    try {
      // Get user from Supabase
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id, role")
        .eq("clerk_id", clerkId)
        .single();

      // If users table doesn't exist or user not found, use defaults
      if (userError || !userData) {
        setStats({ unreadMessages: 0, documentsCount: 0, projectsCount: 0 });
        setIsLoading(false);
        return;
      }

      const isStaffOrAdmin = userData.role === 'admin' || userData.role === 'staff' || userData.role === 'dev';

      // Get counts
      let unreadMessages = 0;
      let documentsCount = 0;
      let projectsCount = 0;

      // Messages: count unread messages in user's conversations
      const { data: convData } = await supabase
        .from("conversations")
        .select("id")
        .eq("user_id", userData.id);

      if (convData && convData.length > 0) {
        const convIds = convData.map(c => c.id);
        const { count } = await supabase
          .from("messages")
          .select("*", { count: "exact", head: true })
          .in("conversation_id", convIds)
          .eq("is_read", false)
          .neq("sender_id", userData.id);
        unreadMessages = count || 0;
      }

      // For staff/admin: also count messages from ALL conversations they didn't send
      if (isStaffOrAdmin) {
        const { count } = await supabase
          .from("messages")
          .select("*", { count: "exact", head: true })
          .eq("is_read", false)
          .neq("sender_id", userData.id);
        unreadMessages = count || 0;
      }

      // Documents: count based on role
      if (isStaffOrAdmin) {
        // Staff/Admin see all documents
        const { count } = await supabase
          .from("documents")
          .select("*", { count: "exact", head: true });
        documentsCount = count || 0;
      } else {
        // Regular users see only their documents
        const { count } = await supabase
          .from("documents")
          .select("*", { count: "exact", head: true })
          .eq("user_id", userData.id);
        documentsCount = count || 0;
      }

      // Projects: count based on role
      if (isStaffOrAdmin) {
        // Staff/Admin see all projects
        const { count } = await supabase
          .from("projects")
          .select("*", { count: "exact", head: true });
        projectsCount = count || 0;
      } else {
        // Regular users see only their projects
        const { count } = await supabase
          .from("projects")
          .select("*", { count: "exact", head: true })
          .eq("user_id", userData.id);
        projectsCount = count || 0;
      }

      setStats({ unreadMessages, documentsCount, projectsCount });
    } catch (error: unknown) {
      const err = error as { message?: string };
      if (!err.message?.includes('does not exist')) {
        console.error("Error loading stats:", error);
      }
      setStats({ unreadMessages: 0, documentsCount: 0, projectsCount: 0 });
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions: QuickAction[] = [
    {
      title: "Messages",
      description: stats.unreadMessages > 0 
        ? `${stats.unreadMessages} message${stats.unreadMessages > 1 ? 's' : ''} non lu${stats.unreadMessages > 1 ? 's' : ''}`
        : "Discutez avec notre equipe",
      href: "/dashboard/messages",
      icon: <MessageSquare className="w-4 h-4" />,
      count: stats.unreadMessages,
    },
    {
      title: "Documents",
      description: stats.documentsCount > 0 
        ? `${stats.documentsCount} document${stats.documentsCount > 1 ? 's' : ''} envoye${stats.documentsCount > 1 ? 's' : ''}`
        : "Envoyez vos fichiers",
      href: "/dashboard/documents",
      icon: <FileText className="w-4 h-4" />,
      count: stats.documentsCount,
    },
    {
      title: "Projets",
      description: stats.projectsCount > 0 
        ? `${stats.projectsCount} projet${stats.projectsCount > 1 ? 's' : ''} en cours`
        : "Gérez vos projets",
      href: "/dashboard/projets",
      icon: <FolderKanban className="w-4 h-4" />,
      count: stats.projectsCount,
    },
  ];

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-5 h-5 text-white/40 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with Status */}
      <div className="border-b border-white/10 pb-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-[10px] text-white/50 uppercase tracking-widest mb-2">Espace personnel</p>
            <h1 className="text-2xl font-light text-white">
              Bonjour, {user?.firstName || "Utilisateur"} 👋
            </h1>
            <p className="text-white/40 text-sm mt-1">
              {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
          </div>
          <Link 
            href="/dashboard/messages"
            className="flex items-center gap-2 px-4 py-2 bg-white text-black text-sm hover:bg-white/90 transition-all duration-200 active:scale-95"
          >
            <MessageSquare className="w-4 h-4" />
            Messagerie
            {stats.unreadMessages > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-black text-white text-[10px] rounded-full">
                {stats.unreadMessages}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Quick Actions with Stats */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] text-white/50 uppercase tracking-widest">Actions rapides</p>
          {isLoading && <Loader2 className="w-3 h-3 text-white/30 animate-spin" />}
        </div>
        <div className="border border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {quickActions.map((action, index) => (
              <Link
                key={action.title}
                href={action.href}
                className={`
                  block p-6 transition-all group relative hover:bg-white/[0.02]
                  ${index !== quickActions.length - 1 ? "md:border-r border-b md:border-b-0 border-white/[0.06]" : ""}
                `}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-white/70 group-hover:text-white transition-colors">
                      {action.icon}
                    </div>
                    <h3 className="text-white/90 text-sm font-light">{action.title}</h3>
                  </div>
                  {action.count && action.count > 0 ? (
                    <span className="px-2 py-0.5 bg-white/10 text-white/80 text-[10px]">{action.count}</span>
                  ) : (
                    <ArrowRight className="w-3 h-3 text-white/30 group-hover:text-white/60 transition-colors" />
                  )}
                </div>
                <p className="text-white/50 text-xs font-light">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div>
        <p className="text-[10px] text-white/50 uppercase tracking-widest mb-4">Aperçu</p>
        <div className="grid grid-cols-3 border border-white/10">
          <Link href="/dashboard/messages" className="p-5 border-r border-white/[0.06] hover:bg-white/[0.02] transition-colors group">
            <div className="flex items-center justify-between mb-2">
              <MessageSquare className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
              {stats.unreadMessages > 0 && (
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              )}
            </div>
            <p className="text-3xl font-light text-white mb-1">{stats.unreadMessages}</p>
            <p className="text-[10px] text-white/50 uppercase tracking-wider">Messages non lus</p>
          </Link>
          <Link href="/dashboard/documents" className="p-5 border-r border-white/[0.06] hover:bg-white/[0.02] transition-colors group">
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
            </div>
            <p className="text-3xl font-light text-white mb-1">{stats.documentsCount}</p>
            <p className="text-[10px] text-white/50 uppercase tracking-wider">Documents</p>
          </Link>
          <Link href="/dashboard/projets" className="p-5 transition-colors group hover:bg-white/[0.02]">
            <div className="flex items-center justify-between mb-2">
              <FolderKanban className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
            </div>
            <p className="text-3xl font-light text-white mb-1">{stats.projectsCount}</p>
            <p className="text-[10px] text-white/50 uppercase tracking-wider">Projets</p>
          </Link>
        </div>
      </div>

      {/* Features & Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Features */}
        <div className="border border-white/10 p-6">
          <p className="text-[10px] text-white/50 uppercase tracking-widest mb-5">Fonctionnalités incluses</p>
          <div className="space-y-4">
            {[
              "Messagerie avec l'équipe FluxDev",
              "Envoi et gestion de documents",
              "Suivi de projets en temps réel",
              "Contrats et devis en ligne",
              "Planning et calendrier partagé",
            ].map((feature, index) => (
              <div 
                key={index} 
                className={`flex items-center gap-3 py-2 ${index !== 4 ? "border-b border-white/[0.04]" : ""}`}
              >
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-sm font-light text-white/80">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Getting Started Guide */}
        <div className="border border-white/10 p-6">
          <p className="text-[10px] text-white/50 uppercase tracking-widest mb-5">Pour commencer</p>
          <div className="space-y-4">
            <div className="flex gap-4 py-2 border-b border-white/[0.04]">
              <span className="flex-shrink-0 w-6 h-6 border border-white/20 flex items-center justify-center text-white/60 text-xs">1</span>
              <div>
                <p className="text-white/80 text-sm font-light">Présentez votre projet</p>
                <p className="text-white/50 text-xs font-light">Utilisez la messagerie pour décrire votre besoin</p>
              </div>
            </div>
            <div className="flex gap-4 py-2 border-b border-white/[0.04]">
              <span className="flex-shrink-0 w-6 h-6 border border-white/20 flex items-center justify-center text-white/60 text-xs">2</span>
              <div>
                <p className="text-white/80 text-sm font-light">Partagez vos documents</p>
                <p className="text-white/50 text-xs font-light">Cahier des charges, maquettes, références</p>
              </div>
            </div>
            <div className="flex gap-4 py-2">
              <span className="flex-shrink-0 w-6 h-6 border border-white/20 flex items-center justify-center text-white/60 text-xs">3</span>
              <div>
                <p className="text-white/80 text-sm font-light">Recevez votre devis</p>
                <p className="text-white/50 text-xs font-light">Notre équipe vous répondra sous 24h</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

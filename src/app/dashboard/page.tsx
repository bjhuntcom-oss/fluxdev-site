"use client";

import { useUser } from "@clerk/nextjs";
import { 
  MessageSquare, 
  FileText, 
  FolderKanban, 
  ArrowRight,
  Lock,
  Check,
  Clock,
  CheckCircle,
  AlertCircle,
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
  locked?: boolean;
  count?: number;
}

interface DashboardStats {
  unreadMessages: number;
  documentsCount: number;
  projectsCount: number;
}

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [featuresUnlocked, setFeaturesUnlocked] = useState(false);
  const [userStatus, setUserStatus] = useState<string>("pending");
  const [stats, setStats] = useState<DashboardStats>({
    unreadMessages: 0,
    documentsCount: 0,
    projectsCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && user) {
      const unlocked = (user.publicMetadata?.features_unlocked as boolean) || false;
      const status = (user.publicMetadata?.status as string) || "pending";
      setFeaturesUnlocked(unlocked);
      setUserStatus(status);
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

  const getStatusConfig = () => {
    switch (userStatus) {
      case "active":
        return {
          icon: <CheckCircle className="w-4 h-4" />,
          title: "Compte actif",
          description: "Votre compte est verifie. Vous avez acces a toutes les fonctionnalites.",
          color: "text-white/80",
          bgColor: "bg-white/[0.03]",
          borderColor: "border-white/10",
        };
      case "pending":
        return {
          icon: <Clock className="w-4 h-4" />,
          title: "Validation en cours",
          description: "Votre compte est en attente de validation par notre equipe. Vous pouvez deja utiliser la messagerie et envoyer des documents.",
          color: "text-white/60",
          bgColor: "bg-white/[0.02]",
          borderColor: "border-white/[0.06]",
        };
      case "suspended":
        return {
          icon: <AlertCircle className="w-4 h-4" />,
          title: "Compte suspendu",
          description: "Votre compte a ete suspendu. Contactez le support pour plus d informations.",
          color: "text-white/50",
          bgColor: "bg-white/[0.01]",
          borderColor: "border-white/[0.04]",
        };
      default:
        return {
          icon: <Clock className="w-4 h-4" />,
          title: "Statut inconnu",
          description: "Contactez le support pour verifier votre statut.",
          color: "text-white/50",
          bgColor: "bg-white/[0.02]",
          borderColor: "border-white/[0.06]",
        };
    }
  };

  const statusConfig = getStatusConfig();

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
      description: featuresUnlocked 
        ? (stats.projectsCount > 0 
            ? `${stats.projectsCount} projet${stats.projectsCount > 1 ? 's' : ''} en cours`
            : "Aucun projet en cours")
        : "Disponible apres validation",
      href: "/dashboard/projets",
      icon: <FolderKanban className="w-4 h-4" />,
      locked: !featuresUnlocked,
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
              Bonjour, {user?.firstName || "Utilisateur"}
            </h1>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 border border-white/10 bg-white/[0.02]">
            <div className={`w-1.5 h-1.5 ${userStatus === "active" ? "bg-white" : "bg-white/40"}`} />
            <span className="text-[10px] text-white/60 uppercase tracking-wider">
              {userStatus === "active" ? "Actif" : userStatus === "pending" ? "En attente" : userStatus}
            </span>
          </div>
        </div>

        {/* Status Card */}
        <div className={`p-5 border ${statusConfig.borderColor} ${statusConfig.bgColor}`}>
          <div className="flex items-start gap-4">
            <div className={`${statusConfig.color} mt-0.5`}>
              {statusConfig.icon}
            </div>
            <div className="flex-1">
              <p className={`text-sm font-light ${statusConfig.color} mb-1`}>{statusConfig.title}</p>
              <p className="text-white/50 text-xs leading-relaxed">{statusConfig.description}</p>
            </div>
          </div>
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
                href={action.locked ? "#" : action.href}
                className={`
                  block p-6 transition-all group relative
                  ${action.locked ? "opacity-50 cursor-not-allowed" : "hover:bg-white/[0.02]"}
                  ${index !== quickActions.length - 1 ? "md:border-r border-b md:border-b-0 border-white/[0.06]" : ""}
                `}
                onClick={(e) => action.locked && e.preventDefault()}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-white/70 group-hover:text-white transition-colors">
                      {action.icon}
                    </div>
                    <h3 className="text-white/90 text-sm font-light">{action.title}</h3>
                  </div>
                  {action.locked ? (
                    <Lock className="w-3 h-3 text-white/30" />
                  ) : action.count && action.count > 0 ? (
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
        <p className="text-[10px] text-white/50 uppercase tracking-widest mb-4">Apercu</p>
        <div className="grid grid-cols-3 border border-white/10">
          <div className="p-5 border-r border-white/[0.06]">
            <p className="text-2xl font-light text-white mb-1">{stats.unreadMessages}</p>
            <p className="text-[10px] text-white/50 uppercase tracking-wider">Messages</p>
          </div>
          <div className="p-5 border-r border-white/[0.06]">
            <p className="text-2xl font-light text-white mb-1">{stats.documentsCount}</p>
            <p className="text-[10px] text-white/50 uppercase tracking-wider">Documents</p>
          </div>
          <div className="p-5">
            <p className="text-2xl font-light text-white mb-1">{featuresUnlocked ? stats.projectsCount : "—"}</p>
            <p className="text-[10px] text-white/50 uppercase tracking-wider">Projets</p>
          </div>
        </div>
      </div>

      {/* Features & Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Features */}
        <div className="border border-white/10 p-6">
          <p className="text-[10px] text-white/50 uppercase tracking-widest mb-5">Fonctionnalites disponibles</p>
          <div className="space-y-4">
            {[
              { label: "Messagerie avec l equipe FluxDev", available: true },
              { label: "Envoi et gestion de documents", available: true },
              { label: "Suivi de projets en temps reel", available: featuresUnlocked },
              { label: "Contrats et devis en ligne", available: featuresUnlocked },
              { label: "Planning et calendrier partage", available: featuresUnlocked },
            ].map((feature, index) => (
              <div 
                key={index} 
                className={`flex items-center gap-3 py-2 ${index !== 4 ? "border-b border-white/[0.04]" : ""}`}
              >
                {feature.available ? (
                  <Check className="w-3.5 h-3.5 text-white/60" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-white/30" />
                )}
                <span className={`text-sm font-light ${feature.available ? "text-white/80" : "text-white/40"}`}>
                  {feature.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Getting Started Guide */}
        <div className="border border-white/10 p-6">
          <p className="text-[10px] text-white/50 uppercase tracking-widest mb-5">
            {featuresUnlocked ? "Prochaines etapes" : "Pour commencer"}
          </p>
          <div className="space-y-4">
            {featuresUnlocked ? (
              <>
                <div className="flex gap-4 py-2 border-b border-white/[0.04]">
                  <span className="flex-shrink-0 w-6 h-6 border border-white/20 flex items-center justify-center text-white/60 text-xs">1</span>
                  <div>
                    <p className="text-white/80 text-sm font-light">Creez votre premier projet</p>
                    <p className="text-white/50 text-xs font-light">Definissez les objectifs et le planning</p>
                  </div>
                </div>
                <div className="flex gap-4 py-2 border-b border-white/[0.04]">
                  <span className="flex-shrink-0 w-6 h-6 border border-white/20 flex items-center justify-center text-white/60 text-xs">2</span>
                  <div>
                    <p className="text-white/80 text-sm font-light">Suivez l avancement</p>
                    <p className="text-white/50 text-xs font-light">Consultez les mises a jour en temps reel</p>
                  </div>
                </div>
                <div className="flex gap-4 py-2">
                  <span className="flex-shrink-0 w-6 h-6 border border-white/20 flex items-center justify-center text-white/60 text-xs">3</span>
                  <div>
                    <p className="text-white/80 text-sm font-light">Validez les livrables</p>
                    <p className="text-white/50 text-xs font-light">Approuvez chaque etape du projet</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex gap-4 py-2 border-b border-white/[0.04]">
                  <span className="flex-shrink-0 w-6 h-6 border border-white/20 flex items-center justify-center text-white/60 text-xs">1</span>
                  <div>
                    <p className="text-white/80 text-sm font-light">Presentez votre projet</p>
                    <p className="text-white/50 text-xs font-light">Utilisez la messagerie pour decrire votre besoin</p>
                  </div>
                </div>
                <div className="flex gap-4 py-2 border-b border-white/[0.04]">
                  <span className="flex-shrink-0 w-6 h-6 border border-white/20 flex items-center justify-center text-white/60 text-xs">2</span>
                  <div>
                    <p className="text-white/80 text-sm font-light">Partagez vos documents</p>
                    <p className="text-white/50 text-xs font-light">Cahier des charges, maquettes, references</p>
                  </div>
                </div>
                <div className="flex gap-4 py-2">
                  <span className="flex-shrink-0 w-6 h-6 border border-white/20 flex items-center justify-center text-white/60 text-xs">3</span>
                  <div>
                    <p className="text-white/80 text-sm font-light">Recevez votre devis</p>
                    <p className="text-white/50 text-xs font-light">Notre equipe vous repondra sous 24h</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

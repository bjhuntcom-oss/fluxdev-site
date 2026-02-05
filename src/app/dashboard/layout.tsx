"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  FolderKanban,
  Settings,
  Users,
  BarChart3,
  Shield,
  Code,
  Bell,
  Menu,
  X,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { UserButton } from "@clerk/nextjs";
import { useUserSync } from "@/hooks/useUserSync";
import { supabase, initClerkId } from "@/lib/supabase/client";
import { ToastProvider } from "@/components/ui/Toast";
import { NotificationDropdown } from "@/components/ui/NotificationDropdown";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  roles?: string[];
  badge?: number;
}

const navItems: NavItem[] = [
  { label: "Tableau de bord", href: "/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Messages", href: "/dashboard/messages", icon: <MessageSquare className="w-4 h-4" /> },
  { label: "Documents", href: "/dashboard/documents", icon: <FileText className="w-4 h-4" /> },
  { label: "Projets", href: "/dashboard/projets", icon: <FolderKanban className="w-4 h-4" /> },
  { label: "Parametres", href: "/dashboard/parametres", icon: <Settings className="w-4 h-4" /> },
];

const staffNavItems: NavItem[] = [
  { label: "Utilisateurs", href: "/dashboard/staff/users", icon: <Users className="w-4 h-4" />, roles: ["staff", "dev", "admin"] },
  { label: "Conversations", href: "/dashboard/staff/conversations", icon: <MessageSquare className="w-4 h-4" />, roles: ["staff", "dev", "admin"] },
];

const adminNavItems: NavItem[] = [
  { label: "Administration", href: "/dashboard/admin", icon: <Shield className="w-4 h-4" />, roles: ["admin"] },
  { label: "Utilisateurs", href: "/dashboard/admin/users", icon: <Users className="w-4 h-4" />, roles: ["admin"] },
  { label: "Analytics", href: "/dashboard/admin/analytics", icon: <BarChart3 className="w-4 h-4" />, roles: ["admin"] },
  { label: "Logs", href: "/dashboard/admin/logs", icon: <FileText className="w-4 h-4" />, roles: ["admin"] },
];

const devNavItems: NavItem[] = [
  { label: "Dev Tools", href: "/dashboard/dev", icon: <Code className="w-4 h-4" />, roles: ["dev", "admin"] },
  { label: "API Logs", href: "/dashboard/dev/api-logs", icon: <FileText className="w-4 h-4" />, roles: ["dev", "admin"] },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userStatus, setUserStatus] = useState<string | null>(null);
  const [supabaseUserId, setSupabaseUserId] = useState<string | null>(null);
  const [roleLoaded, setRoleLoaded] = useState(false);
  const { isSynced, isLoading: isSyncing, error: syncError } = useUserSync();

  // Initialize clerk_id SYNCHRONOUSLY during render to avoid race condition
  // Child component effects fire before parent effects, so we need the header set before any effects run
  if (isLoaded && user?.id) {
    initClerkId(user.id);
  }

  useEffect(() => {
    async function fetchUserRole() {
      if (isLoaded && user) {
        // Fetch role and ID from Supabase (source of truth)
        const { data: userData } = await supabase
          .from('users')
          .select('id, role, status')
          .eq('clerk_id', user.id)
          .single();

        if (userData) {
          setUserRole(userData.role || 'user');
          setUserStatus(userData.status || 'active');
          setSupabaseUserId(userData.id);
        } else {
          // Fallback to Clerk metadata
          const role = (user.publicMetadata?.role as string) || "user";
          setUserRole(role);
        }
        setRoleLoaded(true);
      }
    }
    fetchUserRole();
  }, [isLoaded, user]);

  // Client-side role-based access control
  useEffect(() => {
    if (!isLoaded || isSyncing || !roleLoaded || !userRole) return;
    
    const isAdminRoute = pathname.startsWith('/dashboard/admin');
    const isStaffRoute = pathname.startsWith('/dashboard/staff');
    const isDevRoute = pathname.startsWith('/dashboard/dev');
    
    // Redirect if user doesn't have access
    if (isAdminRoute && userRole !== 'admin') {
      router.replace('/dashboard');
    } else if (isStaffRoute && !['staff', 'dev', 'admin'].includes(userRole)) {
      router.replace('/dashboard');
    } else if (isDevRoute && !['dev', 'admin'].includes(userRole)) {
      router.replace('/dashboard');
    }
  }, [pathname, userRole, isLoaded, isSyncing, roleLoaded, router]);

  // Show loading while role is being fetched
  if (!isLoaded || isSyncing || !roleLoaded) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        {isSyncing && <p className="text-white/40 text-sm">Synchronisation du compte...</p>}
      </div>
    );
  }


  // Blocked view for suspended/banned users
  if (userStatus === 'suspended' || userStatus === 'banned') {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6 p-8">
        <div className="w-16 h-16 border-2 border-red-500/30 flex items-center justify-center">
          <Shield className="w-8 h-8 text-red-500/60" />
        </div>
        <div className="text-center max-w-md">
          <h1 className="text-xl font-light text-white mb-2">
            {userStatus === 'banned' ? 'Compte banni' : 'Compte suspendu'}
          </h1>
          <p className="text-white/50 text-sm mb-6">
            {userStatus === 'banned' 
              ? 'Votre compte a été banni. Vous ne pouvez plus accéder au dashboard.'
              : 'Votre compte a été temporairement suspendu. Veuillez contacter l\'équipe FluxDev pour plus d\'informations.'}
          </p>
          <a 
            href="mailto:contact@fluxdev.io"
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-colors text-sm"
          >
            Contacter le support
          </a>
        </div>
        <div className="mt-4">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-8 h-8",
              },
            }}
          />
        </div>
      </div>
    );
  }

  // Pending user view
  if (userStatus === 'pending') {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6 p-8">
        <div className="w-16 h-16 border-2 border-amber-500/30 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-amber-500/60 animate-spin" />
        </div>
        <div className="text-center max-w-md">
          <h1 className="text-xl font-light text-white mb-2">Compte en attente de validation</h1>
          <p className="text-white/50 text-sm mb-6">
            Votre compte est en cours de vérification par notre équipe. Vous recevrez une notification dès qu&apos;il sera activé.
          </p>
        </div>
        <div className="mt-4">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-8 h-8",
              },
            }}
          />
        </div>
      </div>
    );
  }

  const canAccess = (roles?: string[]) => {
    if (!roles) return true;
    if (!userRole) return false;
    return roles.includes(userRole);
  };

  const NavLink = ({ item }: { item: NavItem }) => {
    const isActive = pathname === item.href;

    if (!canAccess(item.roles)) return null;

    return (
      <Link
        href={item.href}
        onClick={() => setSidebarOpen(false)}
        className={`
          flex items-center gap-3 px-4 py-2.5 transition-all relative
          ${isActive ? "bg-white/[0.06] text-white" : "text-white/60 hover:text-white hover:bg-white/[0.03]"}
        `}
      >
        {isActive && (
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white" />
        )}
        {item.icon}
        <span className="text-sm font-light">{item.label}</span>
        {item.badge && (
          <span className="ml-auto text-[10px] text-white/70">{item.badge}</span>
        )}
      </Link>
    );
  };

  return (
    <ToastProvider>
    <div className="h-screen bg-black flex overflow-hidden">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 border border-white/10 text-white/60 hover:text-white hover:bg-white/[0.03] transition-all"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar - Fixed */}
      <aside
        className={`
          fixed lg:fixed inset-y-0 left-0 z-40 w-64 bg-[#030303] border-r border-white/10
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-screen">
          {/* Logo */}
          <div className="px-6 py-5 border-b border-white/[0.06]">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white flex items-center justify-center">
                <span className="text-black font-semibold text-sm">F</span>
              </div>
              <div>
                <h1 className="text-white text-sm font-medium tracking-tight">FluxDev</h1>
                <p className="text-white/30 text-[10px] uppercase tracking-widest">Dashboard</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-4 overflow-y-auto">
            <div className="mb-6">
              <p className="px-4 text-[10px] text-white/30 uppercase tracking-widest mb-3">Navigation</p>
              {navItems.map((item) => (
                <NavLink key={item.href} item={item} />
              ))}
            </div>

            {canAccess(["staff", "admin"]) && (
              <div className="mb-6">
                <p className="px-4 text-[10px] text-white/30 uppercase tracking-widest mb-3">Staff</p>
                {staffNavItems.map((item) => (
                  <NavLink key={item.href} item={item} />
                ))}
              </div>
            )}

            {canAccess(["dev", "admin"]) && (
              <div className="mb-6">
                <p className="px-4 text-[10px] text-white/30 uppercase tracking-widest mb-3">Dev</p>
                {devNavItems.map((item) => (
                  <NavLink key={item.href} item={item} />
                ))}
              </div>
            )}

            {canAccess(["admin"]) && (
              <div className="mb-6">
                <p className="px-4 text-[10px] text-white/30 uppercase tracking-widest mb-3">Admin</p>
                {adminNavItems.map((item) => (
                  <NavLink key={item.href} item={item} />
                ))}
              </div>
            )}
          </nav>

          {/* User Section */}
          <div className="px-4 py-4 border-t border-white/[0.06]">
            <div className="flex items-center gap-3">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8",
                  },
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-white/90 text-sm font-light truncate">
                  {user?.firstName || user?.emailAddresses[0]?.emailAddress}
                </p>
                <p className="text-white/40 text-[10px] uppercase tracking-wider">{userRole}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content - Scrollable with left margin for fixed sidebar */}
      <main className="flex-1 ml-0 lg:ml-64 h-screen overflow-y-auto bg-[#0a0a0a]">
        {/* Top Bar - Sticky within main content */}
        <header className="sticky top-0 z-20 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-white/10">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-wider">
              <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
              {pathname !== "/dashboard" && (
                <>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-white/70">
                    {pathname.split("/").pop()?.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase())}
                  </span>
                </>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              {supabaseUserId && <NotificationDropdown userId={supabaseUserId} />}
            </div>
          </div>
        </header>

        {/* Page Content - Scrollable */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
    </ToastProvider>
  );
}

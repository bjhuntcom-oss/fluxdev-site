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
import { useState, useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import { useUserSync } from "@/hooks/useUserSync";
import { supabase, initClerkId, ensureClerkId } from "@/lib/supabase/client";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  roles?: string[];
  badge?: number;
  locked?: boolean;
}

const navItems: NavItem[] = [
  { label: "Tableau de bord", href: "/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Messages", href: "/dashboard/messages", icon: <MessageSquare className="w-4 h-4" /> },
  { label: "Documents", href: "/dashboard/documents", icon: <FileText className="w-4 h-4" /> },
  { label: "Projets", href: "/dashboard/projets", icon: <FolderKanban className="w-4 h-4" />, locked: true },
  { label: "Parametres", href: "/dashboard/parametres", icon: <Settings className="w-4 h-4" /> },
];

const staffNavItems: NavItem[] = [
  { label: "Utilisateurs", href: "/dashboard/staff/users", icon: <Users className="w-4 h-4" />, roles: ["staff", "admin"] },
  { label: "Conversations", href: "/dashboard/staff/conversations", icon: <MessageSquare className="w-4 h-4" />, roles: ["staff", "admin"] },
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
  const [userRole, setUserRole] = useState<string>("user");
  const [featuresUnlocked, setFeaturesUnlocked] = useState(false);
  const { isSynced, isLoading: isSyncing, error: syncError } = useUserSync();

  useEffect(() => {
    async function fetchUserRole() {
      if (isLoaded && user) {
        // Initialize clerk_id for RLS policies
        await initClerkId(user.id);
        await ensureClerkId();
        
        // Fetch role from Supabase (source of truth)
        const { data: userData } = await supabase
          .from('users')
          .select('role, features_unlocked, status')
          .eq('clerk_id', user.id)
          .single();

        if (userData) {
          setUserRole(userData.role || 'user');
          setFeaturesUnlocked(userData.features_unlocked || false);
        } else {
          // Fallback to Clerk metadata
          const role = (user.publicMetadata?.role as string) || "user";
          const unlocked = (user.publicMetadata?.features_unlocked as boolean) || false;
          setUserRole(role);
          setFeaturesUnlocked(unlocked);
        }
      }
    }
    fetchUserRole();
  }, [isLoaded, user]);

  if (!isLoaded || isSyncing) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        {isSyncing && <p className="text-white/40 text-sm">Synchronisation du compte...</p>}
      </div>
    );
  }


  const canAccess = (roles?: string[]) => {
    if (!roles) return true;
    return roles.includes(userRole);
  };

  const isLocked = (item: NavItem) => {
    return item.locked && !featuresUnlocked && userRole === "user";
  };

  const NavLink = ({ item }: { item: NavItem }) => {
    const isActive = pathname === item.href;
    const locked = isLocked(item);

    if (!canAccess(item.roles)) return null;

    return (
      <Link
        href={locked ? "#" : item.href}
        onClick={(e) => {
          if (locked) {
            e.preventDefault();
          } else {
            setSidebarOpen(false);
          }
        }}
        className={`
          flex items-center gap-3 px-4 py-2.5 transition-all relative
          ${isActive ? "bg-white/[0.06] text-white" : "text-white/60 hover:text-white hover:bg-white/[0.03]"}
          ${locked ? "opacity-40 cursor-not-allowed" : ""}
        `}
      >
        {isActive && (
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white" />
        )}
        {item.icon}
        <span className="text-sm font-light">{item.label}</span>
        {locked && (
          <span className="ml-auto text-[10px] text-white/40 uppercase tracking-wider">Locked</span>
        )}
        {item.badge && (
          <span className="ml-auto text-[10px] text-white/70">{item.badge}</span>
        )}
      </Link>
    );
  };

  return (
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
              <button className="relative p-2 text-white/40 hover:text-white transition-colors">
                <Bell className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content - Scrollable */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

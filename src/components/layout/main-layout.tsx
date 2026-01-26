"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothScroll } from "@/components/smooth-scroll";

const authRoutes = ["/connexion", "/inscription"];
const dashboardRoutes = ["/dashboard"];

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isAuthRoute = authRoutes.some(route => pathname?.startsWith(route));
  const isDashboardRoute = dashboardRoutes.some(route => pathname?.startsWith(route));

  // Auth pages - no header/footer
  if (isAuthRoute) {
    return <>{children}</>;
  }

  // Dashboard pages - no header/footer (has its own layout)
  if (isDashboardRoute) {
    return <>{children}</>;
  }

  // Regular site pages - with header/footer
  return (
    <SmoothScroll>
      <Header />
      <main>{children}</main>
      <Footer />
    </SmoothScroll>
  );
}

// Auth layout — styling only, NO ClerkProvider here (root layout.tsx already provides it)
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import { ClerkProvider } from "@clerk/nextjs";
import { frFR } from "@clerk/localizations";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      localization={frFR}
      appearance={{
        variables: {
          colorPrimary: "#ffffff",
          colorBackground: "#030303",
          colorText: "#ffffff",
          colorTextSecondary: "#666666",
          colorInputBackground: "rgba(255,255,255,0.03)",
          colorInputText: "#ffffff",
        },
        elements: {
          formButtonPrimary: "bg-white text-black hover:bg-white/90 rounded-xl h-12 text-sm uppercase tracking-wider font-medium transition-all duration-300",
          card: "bg-transparent shadow-none p-0 border-none",
          headerTitle: "hidden",
          headerSubtitle: "hidden",
          socialButtonsBlockButton: "bg-white/[0.04] border border-white/[0.08] text-white hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300 rounded-xl h-12 backdrop-blur-sm",
          socialButtonsBlockButtonText: "text-white/80 font-light text-sm",
          socialButtonsProviderIcon: "opacity-80",
          dividerLine: "bg-white/[0.06]",
          dividerText: "text-white/30 text-xs font-light uppercase tracking-widest",
          formFieldLabel: "text-white/60 text-xs font-light uppercase tracking-wider mb-2",
          formFieldInput: "bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-white/20 focus:border-white/20 focus:bg-white/[0.05] focus:ring-0 transition-all duration-300 rounded-xl h-12 px-4 backdrop-blur-sm",
          footerAction: "justify-center",
          footerActionText: "text-white/40 text-sm font-light",
          footerActionLink: "text-white/70 hover:text-white font-normal transition-colors",
          identityPreview: "bg-white/[0.03] border border-white/[0.08] rounded-xl",
          identityPreviewText: "text-white",
          identityPreviewEditButton: "text-white/50 hover:text-white",
          formFieldInputShowPasswordButton: "text-white/40 hover:text-white/70",
          alert: "bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl",
          alertText: "text-red-400 text-sm",
          formFieldErrorText: "text-red-400 text-xs mt-1",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}

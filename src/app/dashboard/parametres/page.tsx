"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { User, Bell, Shield, Save, Loader2, Check } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useLocale } from "@/contexts";
import { useToast } from "@/components/ui/Toast";
import { useLogAction } from "@/contexts/ActivityLoggerContext";

interface UserPreferences {
  notifications_email: boolean;
  notifications_messages: boolean;
  notifications_updates: boolean;
}

export default function SettingsPage() {
  const { user } = useUser();
  const { openUserProfile } = useClerk();
  const { t } = useLocale();
  const { showToast } = useToast();
  const logAction = useLogAction();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [notifications, setNotifications] = useState({
    email: true,
    messages: true,
    updates: false,
  });

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      loadPreferences();
    }
  }, [user]);

  const loadPreferences = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const { data } = await supabase
        .from("users")
        .select("notifications_email, notifications_messages, notifications_updates")
        .eq("clerk_id", user.id)
        .single();

      if (data) {
        setNotifications({
          email: data.notifications_email ?? true,
          messages: data.notifications_messages ?? true,
          updates: data.notifications_updates ?? false,
        });
      }
    } catch (error) {
      console.error("Error loading preferences:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      // Update Clerk user profile
      await user.update({
        firstName,
        lastName,
      });

      // Update Supabase preferences
      const { error: supaError } = await supabase
        .from("users")
        .update({
          first_name: firstName,
          last_name: lastName,
          notifications_email: notifications.email,
          notifications_messages: notifications.messages,
          notifications_updates: notifications.updates,
        })
        .eq("clerk_id", user.id);

      if (supaError) throw supaError;

      logAction({ action: 'update', entityType: 'settings', newValues: { firstName, lastName, notifications } });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving settings:", error);
      showToast(t("dash.settings.saveError"), "error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div className="border-b border-white/[0.06] pb-6">
        <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2">{t("dash.settings.label")}</p>
        <h1 className="text-xl font-light text-white">{t("dash.settings.title")}</h1>
      </div>

      {/* Profile Section */}
      <div className="border border-white/[0.06] p-6">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-4 h-4 text-white/40" />
          <p className="text-[10px] text-white/40 uppercase tracking-widest">{t("dash.settings.profile")}</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/70 text-lg font-light">
              {user?.firstName?.[0] || user?.emailAddresses[0]?.emailAddress[0].toUpperCase()}
            </div>
            <div>
              <p className="text-white/80 text-sm font-light">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-white/40 text-xs">{user?.emailAddresses[0]?.emailAddress}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div>
              <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">{t("dash.settings.firstName")}</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/10"
              />
            </div>
            <div>
              <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">{t("dash.settings.lastName")}</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-white/[0.03] border border-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="border border-white/[0.06] p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-4 h-4 text-white/40" />
          <p className="text-[10px] text-white/40 uppercase tracking-widest">{t("dash.settings.notifications")}</p>
        </div>

        <div className="space-y-px">
          {[
            { key: "email", label: t("dash.settings.notif.email"), description: t("dash.settings.notif.emailDesc") },
            { key: "messages", label: t("dash.settings.notif.messages"), description: t("dash.settings.notif.messagesDesc") },
            { key: "updates", label: t("dash.settings.notif.projects"), description: t("dash.settings.notif.projectsDesc") },
          ].map((item, index) => (
            <div key={item.key} className={`flex items-center justify-between p-4 bg-white/[0.02] ${index !== 2 ? 'border-b border-white/[0.04]' : ''}`}>
              <div>
                <p className="text-white/70 text-sm font-light">{item.label}</p>
                <p className="text-white/30 text-xs">{item.description}</p>
              </div>
              <button
                onClick={() => setNotifications((prev) => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                className={`
                  relative w-10 h-5 transition-colors
                  ${notifications[item.key as keyof typeof notifications] ? "bg-white/80" : "bg-white/10"}
                `}
              >
                <div
                  className={`
                    absolute top-0.5 w-4 h-4 transition-all
                    ${notifications[item.key as keyof typeof notifications] 
                      ? "left-5 bg-black" 
                      : "left-0.5 bg-white/40"
                    }
                  `}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Security Section */}
      <div className="border border-white/[0.06] p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-4 h-4 text-white/40" />
          <p className="text-[10px] text-white/40 uppercase tracking-widest">{t("dash.settings.security") || "Security"}</p>
        </div>

        <div className="space-y-px">
          <div className="p-4 bg-white/[0.02] border-b border-white/[0.04]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-sm font-light">{t("dash.settings.manageAccount") || "Manage account"}</p>
                <p className="text-white/30 text-xs">{t("dash.settings.manageAccountDesc") || "Edit your profile, email and password"}</p>
              </div>
              <button 
                onClick={() => openUserProfile()}
                className="px-4 py-2 border border-white/[0.06] text-white/60 text-xs uppercase tracking-wider hover:bg-white/[0.02] transition-colors"
              >
                {t("dash.settings.open") || "Open"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-4">
        {saveSuccess && (
          <div className="flex items-center gap-2 text-white/60 text-sm">
            <Check className="w-4 h-4" />
            {t("dash.settings.saveSuccess")}
          </div>
        )}
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {t("dash.settings.saving")}
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {t("dash.settings.save")}
            </>
          )}
        </button>
      </div>
    </div>
  );
}

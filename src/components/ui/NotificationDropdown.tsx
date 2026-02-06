"use client";

import { useState, useEffect, useRef } from "react";
import { Bell, MessageSquare, FileText, FolderKanban, Check, X } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { format } from "date-fns";
import { fr, enUS } from "date-fns/locale";
import { useLocale } from "@/contexts";
import Link from "next/link";

interface Notification {
  id: string;
  type: "message" | "document" | "project" | "system";
  title: string;
  content: string;
  is_read: boolean;
  created_at: string;
  link?: string;
}

interface NotificationDropdownProps {
  userId: string;
}

export function NotificationDropdown({ userId }: NotificationDropdownProps) {
  const { locale, t } = useLocale();
  const dateFnsLocale = locale === 'fr' ? fr : enUS;
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  useEffect(() => {
    if (userId) {
      loadNotifications();
      
      const channel = supabase
        .channel(`notifications:${userId}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "notifications",
            filter: `user_id=eq.${userId}`,
          },
          (payload) => {
            setNotifications((prev) => [payload.new as Notification, ...prev]);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [userId]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) {
        if (error.code === "42P01") {
          setNotifications([]);
          return;
        }
        throw error;
      }
      setNotifications(data || []);
    } catch (error) {
      console.error("Error loading notifications:", error);
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("id", id);
      
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await supabase
        .from("notifications")
        .update({ is_read: true })
        .eq("user_id", userId)
        .eq("is_read", false);
      
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageSquare className="w-4 h-4 text-blue-400" />;
      case "document":
        return <FileText className="w-4 h-4 text-green-400" />;
      case "project":
        return <FolderKanban className="w-4 h-4 text-purple-400" />;
      default:
        return <Bell className="w-4 h-4 text-white/40" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-white/40 hover:text-white transition-colors"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-[#0a0a0a] border border-white/10 shadow-xl z-50">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <span className="text-white/80 text-sm font-medium">{t("dash.notif.title")}</span>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-white/40 text-xs hover:text-white/60 transition-colors"
              >
                {t("dash.notif.markAllRead")}
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <div className="p-8 text-center">
                <div className="w-4 h-4 border border-white/20 border-t-white/60 rounded-full animate-spin mx-auto" />
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="w-8 h-8 text-white/10 mx-auto mb-2" />
                <p className="text-white/40 text-sm">{t("dash.notif.noNotif")}</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-4 py-3 border-b border-white/5 hover:bg-white/[0.02] transition-colors ${
                    !notification.is_read ? "bg-white/[0.02]" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">{getIcon(notification.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-white/80 text-sm truncate">{notification.title}</p>
                        {!notification.is_read && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-white/40 text-xs mt-0.5 line-clamp-2">
                        {notification.content}
                      </p>
                      <p className="text-white/30 text-[10px] mt-1">
                        {format(new Date(notification.created_at), "dd MMM HH:mm", { locale: dateFnsLocale })}
                      </p>
                    </div>
                    {!notification.is_read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-1 text-white/30 hover:text-white/60 transition-colors"
                      >
                        <Check className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  {notification.link && (
                    <Link
                      href={notification.link}
                      onClick={() => {
                        markAsRead(notification.id);
                        setIsOpen(false);
                      }}
                      className="block mt-2 text-xs text-white/50 hover:text-white/70 transition-colors"
                    >
                      {t("dash.notif.view")} →
                    </Link>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useUser } from "@clerk/nextjs";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Send, 
  Paperclip, 
  MoreVertical, 
  Search,
  Plus,
  Check,
  CheckCheck,
  X,
  MessageSquare,
  Archive,
  ArchiveRestore,
  Filter,
  Image as ImageIcon,
  FileText,
  Download,
  Loader2
} from "lucide-react";
import Image from "next/image";
import { supabase, ensureClerkId } from "@/lib/supabase/client";
import { sanitizeInput } from "@/lib/security";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useToast } from "@/components/ui/Toast";

interface Attachment {
  name: string;
  url: string;
  type: string;
  size: number;
}

interface Message {
  id: string;
  content: string;
  sender_id: string;
  created_at: string;
  is_read: boolean;
  attachments?: Attachment[];
  sender?: {
    first_name: string;
    last_name: string;
    avatar_url: string;
    role: string;
  };
}

interface Conversation {
  id: string;
  subject: string;
  status: string;
  created_at: string;
  updated_at: string;
  user_id: string;
  assigned_staff_id?: string;
  user?: {
    first_name: string;
    last_name: string;
    role: string;
    email: string;
  };
  assigned_staff?: {
    first_name: string;
    last_name: string;
    role: string;
    email: string;
  };
  last_message?: Message;
  unread_count?: number;
}

interface StaffMember {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

export default function MessagesPage() {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [showNewConversation, setShowNewConversation] = useState(false);
  const [newSubject, setNewSubject] = useState("");
  const [showArchived, setShowArchived] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; conversationId: string } | null>(null);
  const [currentUserRole, setCurrentUserRole] = useState<string>("");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [showAssignModal, setShowAssignModal] = useState<string | null>(null);
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Max file size: 10MB
  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [user]);

  // Handle URL parameter ?conv=id to auto-select conversation
  useEffect(() => {
    const convId = searchParams.get('conv');
    if (convId && conversations.length > 0) {
      const exists = conversations.some(c => c.id === convId);
      if (exists) {
        setSelectedConversation(convId);
      }
    }
  }, [searchParams, conversations]);

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation);
      
      const channel = supabase
        .channel(`messages:${selectedConversation}`)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter: `conversation_id=eq.${selectedConversation}`,
          },
          async (payload) => {
            // Fetch complete message with sender info
            const { data: fullMessage } = await supabase
              .from("messages")
              .select(`
                *,
                sender:users(first_name, last_name, avatar_url, role)
              `)
              .eq("id", payload.new.id)
              .single();
            
            if (fullMessage) {
              setMessages((prev) => {
                // Avoid duplicates
                if (prev.some(m => m.id === fullMessage.id)) return prev;
                return [...prev, fullMessage as Message];
              });
              scrollToBottom();
            }
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [selectedConversation]);

  // Load staff list for admin assignment - defined first to be available in loadConversations
  const loadStaffList = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("id, first_name, last_name, email, role")
        .in("role", ["staff", "dev"])
        .order("first_name");

      if (error) throw error;
      setStaffList(data || []);
    } catch (error) {
      console.error("Error loading staff list:", error);
    }
  };

  const loadConversations = async () => {
    setIsLoading(true);
    try {
      // Ensure clerk_id is set for RLS
      await ensureClerkId(user?.id);
      
      // Get current user ID and role
      const { data: userData } = await supabase
        .from("users")
        .select("id, role")
        .eq("clerk_id", user?.id)
        .single();

      if (!userData) {
        setConversations([]);
        setIsLoading(false);
        return;
      }

      const currentUserIdValue = userData.id;
      const userRole = userData.role;
      setCurrentUserId(currentUserIdValue);
      setCurrentUserRole(userRole);

      // Load staff list for admin assignment
      if (userRole === 'admin') {
        loadStaffList();
      }

      // Build query based on role - STRICT CONFIDENTIALITY
      let query = supabase
        .from("conversations")
        .select(`
          *,
          user:users!conversations_user_id_fkey(first_name, last_name, role, email)
        `)
        .order("updated_at", { ascending: false });

      // Apply role-based filtering
      if (userRole === 'admin') {
        // Admin sees ALL conversations
        // No filter needed
      } else if (userRole === 'staff' || userRole === 'dev') {
        // Staff/Dev sees ONLY conversations assigned to them
        query = query.eq("assigned_staff_id", currentUserIdValue);
      } else {
        // Regular User sees ONLY their own conversations
        query = query.eq("user_id", currentUserIdValue);
      }

      const { data, error } = await query;

      if (error) {
        if (error.code === '42P01' || error.message?.includes('does not exist')) {
          setConversations([]);
          return;
        }
        throw error;
      }

      // Get unread count for each conversation
      if (data && currentUserIdValue) {
        const conversationsWithUnread = await Promise.all(
          data.map(async (conv) => {
            const { count } = await supabase
              .from("messages")
              .select("*", { count: "exact", head: true })
              .eq("conversation_id", conv.id)
              .eq("is_read", false)
              .neq("sender_id", currentUserIdValue);
            
            return { ...conv, unread_count: count || 0 };
          })
        );
        setConversations(conversationsWithUnread);
      } else {
        setConversations(data || []);
      }
      
      if (data && data.length > 0 && !selectedConversation) {
        setSelectedConversation(data[0].id);
      }
    } catch (error: unknown) {
      const err = error as { message?: string };
      if (!err.message?.includes('does not exist')) {
        console.error("Error loading conversations:", error);
      }
      setConversations([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Admin assigns conversation to a staff member
  const assignConversationToStaff = async (conversationId: string, staffId: string) => {
    try {
      const { error } = await supabase
        .from("conversations")
        .update({ assigned_staff_id: staffId })
        .eq("id", conversationId);

      if (error) throw error;
      
      setShowAssignModal(null);
      loadConversations(); // Refresh list
    } catch (error) {
      console.error("Error assigning conversation:", error);
    }
  };

  // Admin unassigns conversation
  const unassignConversation = async (conversationId: string) => {
    try {
      const { error } = await supabase
        .from("conversations")
        .update({ assigned_staff_id: null })
        .eq("id", conversationId);

      if (error) throw error;
      loadConversations();
    } catch (error) {
      console.error("Error unassigning conversation:", error);
    }
  };

  const loadMessages = async (conversationId: string) => {
    try {
      await ensureClerkId(user?.id);
      
      // Get current user ID
      const { data: userData } = await supabase
        .from("users")
        .select("id")
        .eq("clerk_id", user?.id)
        .single();

      const currentUserId = userData?.id;

      const { data, error } = await supabase
        .from("messages")
        .select(`
          *,
          sender:users(first_name, last_name, avatar_url, role)
        `)
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      setMessages(data || []);

      // Mark messages as read (messages not sent by current user)
      if (currentUserId && data && data.length > 0) {
        await supabase
          .from("messages")
          .update({ is_read: true })
          .eq("conversation_id", conversationId)
          .eq("is_read", false)
          .neq("sender_id", currentUserId);

        // Update unread count in conversations list
        setConversations(prev => 
          prev.map(conv => 
            conv.id === conversationId ? { ...conv, unread_count: 0 } : conv
          )
        );
      }
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  // Helper to get or create user in database
  const getOrCreateUser = async () => {
    await ensureClerkId(user?.id);
    
    // Try to get user first
    let { data: userData } = await supabase
      .from("users")
      .select("id")
      .eq("clerk_id", user?.id)
      .single();

    // If user doesn't exist, sync from Clerk
    if (!userData && user) {
      console.log("User not found, syncing from Clerk...");
      try {
        const response = await fetch("/api/user/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
          // Retry getting user after sync
          const { data: newUserData } = await supabase
            .from("users")
            .select("id")
            .eq("clerk_id", user?.id)
            .single();
          userData = newUserData;
        }
      } catch (syncError) {
        console.error("Error syncing user:", syncError);
      }
    }

    return userData;
  };

  const createConversation = async () => {
    if (!newSubject.trim() || isCreating) return;

    setIsCreating(true);
    try {
      const userData = await getOrCreateUser();

      if (!userData) {
        console.error("User not found in database for clerk_id:", user?.id);
        return;
      }

      const { data, error } = await supabase
        .from("conversations")
        .insert({
          user_id: userData.id,
          subject: sanitizeInput(newSubject),
          status: "open",
        })
        .select()
        .single();

      if (error) throw error;

      setConversations((prev) => [data, ...prev]);
      setSelectedConversation(data.id);
      setShowNewConversation(false);
      setNewSubject("");
    } catch (error) {
      console.error("Error creating conversation:", error);
    } finally {
      setIsCreating(false);
    }
  };

  // Upload files to Supabase Storage
  const uploadFiles = async (files: File[]): Promise<Attachment[]> => {
    const attachments: Attachment[] = [];
    
    for (const file of files) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${selectedConversation}/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('message-attachments')
        .upload(filePath, file);
      
      if (uploadError) {
        console.error('Upload error:', uploadError);
        continue;
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from('message-attachments')
        .getPublicUrl(filePath);
      
      attachments.push({
        name: file.name,
        url: publicUrl,
        type: file.type,
        size: file.size
      });
    }
    
    return attachments;
  };

  const sendMessage = async () => {
    if ((!newMessage.trim() && pendingFiles.length === 0) || !selectedConversation || isSending) return;

    setIsSending(true);
    setIsUploading(pendingFiles.length > 0);
    
    try {
      const userData = await getOrCreateUser();
      if (!userData) return;

      // Upload files if any
      let attachments: Attachment[] = [];
      if (pendingFiles.length > 0) {
        attachments = await uploadFiles(pendingFiles);
      }

      const { error } = await supabase.from("messages").insert({
        conversation_id: selectedConversation,
        sender_id: userData.id,
        content: sanitizeInput(newMessage) || (attachments.length > 0 ? '' : ''),
        attachments: attachments.length > 0 ? attachments : null,
      });

      if (error) throw error;

      setNewMessage("");
      setPendingFiles([]);
      
      await supabase
        .from("conversations")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", selectedConversation);
      
      // Reload messages to show the new one
      await loadMessages(selectedConversation);
    } catch (error) {
      console.error("Error sending message:", error);
      showToast("Erreur lors de l'envoi du message", "error");
    } finally {
      setIsSending(false);
      setIsUploading(false);
    }
  };

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadError(null);
    
    // Validate file sizes
    const validFiles: File[] = [];
    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        setUploadError(`"${file.name}" dépasse 10MB`);
        continue;
      }
      validFiles.push(file);
    }
    
    if (validFiles.length > 0) {
      setPendingFiles(prev => [...prev, ...validFiles]);
    }
    e.target.value = '';
  };

  // Remove pending file
  const removePendingFile = (index: number) => {
    setPendingFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Check if file is an image
  const isImageFile = (type: string) => type.startsWith('image/');

  const selectedConv = conversations.find((c) => c.id === selectedConversation);

  const handleContextMenu = (e: React.MouseEvent, conversationId: string) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, conversationId });
  };

  const closeContextMenu = () => setContextMenu(null);

  const markAsRead = async (conversationId: string) => {
    try {
      const { data: userData } = await supabase
        .from("users")
        .select("id")
        .eq("clerk_id", user?.id)
        .single();

      if (!userData) return;

      await supabase
        .from("messages")
        .update({ is_read: true })
        .eq("conversation_id", conversationId)
        .neq("sender_id", userData.id);

      setConversations(prev =>
        prev.map(conv =>
          conv.id === conversationId ? { ...conv, unread_count: 0 } : conv
        )
      );
      closeContextMenu();
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const deleteConversation = async (conversationId: string) => {
    try {
      // Delete messages first
      await supabase.from("messages").delete().eq("conversation_id", conversationId);
      // Then delete conversation
      await supabase.from("conversations").delete().eq("id", conversationId);

      setConversations(prev => prev.filter(c => c.id !== conversationId));
      if (selectedConversation === conversationId) {
        setSelectedConversation(null);
      }
      closeContextMenu();
    } catch (error) {
      console.error("Error deleting conversation:", error);
    }
  };

  const archiveConversation = async (conversationId: string) => {
    try {
      const conv = conversations.find(c => c.id === conversationId);
      const newStatus = conv?.status === 'archived' ? 'open' : 'archived';
      
      const { error } = await supabase
        .from('conversations')
        .update({ status: newStatus })
        .eq('id', conversationId);

      if (error) throw error;

      setConversations(prev => 
        prev.map(c => c.id === conversationId ? { ...c, status: newStatus } : c)
      );
      
      if (newStatus === 'archived' && selectedConversation === conversationId) {
        setSelectedConversation(null);
      }
      
      setShowMenu(false);
      closeContextMenu();
    } catch (error) {
      console.error('Error archiving conversation:', error);
    }
  };

  const filteredConversations = conversations.filter(conv => {
    const matchesArchive = showArchived ? conv.status === 'archived' : conv.status !== 'archived';
    if (!searchQuery.trim()) return matchesArchive;
    
    const userInfo = Array.isArray(conv.user) ? conv.user[0] : conv.user;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      conv.subject?.toLowerCase().includes(searchLower) ||
      userInfo?.first_name?.toLowerCase().includes(searchLower) ||
      userInfo?.last_name?.toLowerCase().includes(searchLower) ||
      userInfo?.email?.toLowerCase().includes(searchLower);
    
    return matchesArchive && matchesSearch;
  });

  return (
    <div className="h-[calc(100vh-180px)] flex border border-white/[0.06] overflow-hidden bg-[#0a0a0a]">
      {/* Conversations List */}
      <div className="w-72 border-r border-white/[0.06] flex flex-col">
        <div className="p-4 border-b border-white/[0.06]">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[10px] text-white/40 uppercase tracking-widest">
              {showArchived ? 'Archives' : 'Messages'}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowArchived(!showArchived)}
                className={`p-1.5 transition-colors ${showArchived ? 'bg-white/10' : 'hover:bg-white/[0.04]'}`}
                title={showArchived ? 'Voir messages actifs' : 'Voir archives'}
              >
                <Archive className="w-4 h-4 text-white/50" />
              </button>
              <button
                onClick={() => setShowNewConversation(true)}
                className="p-1.5 hover:bg-white/[0.08] transition-all duration-200 active:scale-90 hover:text-white"
              >
                <Plus className="w-4 h-4 text-white/50 hover:text-white transition-colors" />
              </button>
            </div>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-white/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher..."
              className="w-full bg-white/[0.03] border border-white/[0.06] pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/10"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="w-4 h-4 border border-white/20 border-t-white/60 animate-spin" />
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="p-4 text-center text-white/40">
              <p className="text-sm">{showArchived ? 'Aucune archive' : 'Aucune conversation'}</p>
              {!showArchived && (
                <button
                  onClick={() => setShowNewConversation(true)}
                  className="mt-3 px-4 py-2 bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 text-sm transition-all duration-200 active:scale-95"
                >
                  + Démarrer une conversation
                </button>
              )}
            </div>
          ) : (
            filteredConversations.map((conversation) => {
              const userInfo = Array.isArray(conversation.user) ? conversation.user[0] : conversation.user;
              const roleLabel = userInfo?.role === 'admin' ? 'Admin' : 
                               userInfo?.role === 'staff' ? 'Staff' : 
                               userInfo?.role === 'dev' ? 'Dev' : 'User';
              const userName = userInfo ? `${userInfo.first_name || ''} ${userInfo.last_name || ''}`.trim() : 'Utilisateur';
              
              return (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation.id)}
                  onContextMenu={(e) => handleContextMenu(e, conversation.id)}
                  className={`
                    w-full p-4 text-left border-b border-white/[0.04] transition-colors relative
                    ${selectedConversation === conversation.id ? "bg-white/[0.04]" : "hover:bg-white/[0.02]"}
                  `}
                >
                  {selectedConversation === conversation.id && (
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-white/60" />
                  )}
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-2 pr-2 min-w-0">
                      <h3 className="text-white/80 text-sm font-light truncate">
                        {conversation.subject || "Nouvelle conversation"}
                      </h3>
                      {(conversation.unread_count ?? 0) > 0 && (
                        <span className="flex-shrink-0 min-w-[18px] h-[18px] flex items-center justify-center bg-white text-black text-[10px] font-medium rounded-full">
                          {conversation.unread_count}
                        </span>
                      )}
                    </div>
                    <span className="text-white/30 text-[10px] flex-shrink-0">
                      {format(new Date(conversation.updated_at), "HH:mm", { locale: fr })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] px-1.5 py-0.5 bg-white/5 border border-white/10 text-white/50">
                      {roleLabel}
                    </span>
                    <span className="text-white/50 text-xs truncate">{userName}</span>
                  </div>
                  <p className="text-white/40 text-xs truncate">
                    {conversation.status === "archived" ? "Archivee" : conversation.status === "open" ? "En cours" : "Fermee"}
                  </p>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation && selectedConv ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-white/[0.06] flex items-center justify-between">
              <div>
                <h3 className="text-white/90 text-sm font-light">{selectedConv.subject || "Conversation"}</h3>
                <div className="flex items-center gap-2 mt-1">
                  {(() => {
                    const convUser = Array.isArray(selectedConv.user) ? selectedConv.user[0] : selectedConv.user;
                    const convRole = convUser?.role === 'admin' ? 'Admin' : 
                                    convUser?.role === 'staff' ? 'Staff' : 
                                    convUser?.role === 'dev' ? 'Dev' : 'User';
                    const convName = convUser ? `${convUser.first_name || ''} ${convUser.last_name || ''}`.trim() : '';
                    return (
                      <>
                        <span className="text-[10px] px-1.5 py-0.5 bg-white/5 border border-white/10 text-white/40">{convRole}</span>
                        <span className="text-white/50 text-xs">{convName}</span>
                        <span className="text-white/30 text-xs">-</span>
                        <span className="text-white/40 text-xs">
                          {selectedConv.status === "archived" ? "Archivee" : selectedConv.status === "open" ? "Active" : "Fermee"}
                        </span>
                      </>
                    );
                  })()}
                </div>
                {/* Show assigned staff info */}
                {selectedConv.assigned_staff && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-white/30">Assigné à:</span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
                      {(() => {
                        const staff = Array.isArray(selectedConv.assigned_staff) ? selectedConv.assigned_staff[0] : selectedConv.assigned_staff;
                        return staff ? `${staff.first_name} ${staff.last_name}` : '';
                      })()}
                    </span>
                    {currentUserRole === 'admin' && (
                      <button
                        onClick={() => unassignConversation(selectedConv.id)}
                        className="text-[10px] text-red-400/60 hover:text-red-400"
                      >
                        Retirer
                      </button>
                    )}
                  </div>
                )}
                {/* Admin can assign if not assigned */}
                {currentUserRole === 'admin' && !selectedConv.assigned_staff_id && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-amber-400/60">Non assigné</span>
                    <button
                      onClick={() => setShowAssignModal(selectedConv.id)}
                      className="text-[10px] px-2 py-0.5 bg-white/5 border border-white/10 text-white/60 hover:bg-white/10"
                    >
                      Assigner à un staff
                    </button>
                  </div>
                )}
              </div>
              <div className="relative">
                <button 
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-2 hover:bg-white/[0.04] transition-colors"
                >
                  <MoreVertical className="w-4 h-4 text-white/40" />
                </button>
                {showMenu && (
                  <div className="absolute right-0 top-full mt-1 bg-[#0a0a0a] border border-white/10 min-w-[160px] z-50">
                    <button
                      onClick={() => archiveConversation(selectedConversation)}
                      className="w-full px-4 py-2.5 text-left text-sm text-white/70 hover:bg-white/[0.04] flex items-center gap-2 transition-colors"
                    >
                      {selectedConv.status === 'archived' ? (
                        <>
                          <ArchiveRestore className="w-4 h-4" />
                          Desarchiver
                        </>
                      ) : (
                        <>
                          <Archive className="w-4 h-4" />
                          Archiver
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center text-white/40">
                  <p className="text-sm">Commencez la conversation...</p>
                </div>
              ) : (
                messages.map((message) => {
                  const isOwn = message.sender_id === currentUserId;
                  const senderRole = isOwn ? '' : 
                                    message.sender?.role === 'admin' ? 'Admin' : 
                                    message.sender?.role === 'staff' ? 'Staff' : 
                                    message.sender?.role === 'dev' ? 'Dev' : 'User';
                  const senderName = isOwn ? 'Moi' : 
                                    `${message.sender?.first_name || ''} ${message.sender?.last_name || ''}`.trim() || 'Utilisateur';
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] px-4 py-3 ${isOwn ? "bg-white text-black" : "bg-white/10 text-white border border-white/10"}`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {!isOwn && senderRole && (
                            <span className="text-[9px] px-1 py-0.5 bg-white/10 text-white/50">
                              {senderRole}
                            </span>
                          )}
                          <span className={`text-[10px] ${isOwn ? 'text-black/70 font-medium' : 'text-white/60'}`}>
                            {senderName}
                          </span>
                        </div>
                        {message.content && (
                          <p className="text-sm leading-relaxed">{message.content}</p>
                        )}
                        
                        {/* Attachments */}
                        {message.attachments && message.attachments.length > 0 && (
                          <div className="mt-2 space-y-2">
                            {message.attachments.map((attachment, idx) => (
                              <div key={idx}>
                                {isImageFile(attachment.type) ? (
                                  <a href={attachment.url} target="_blank" rel="noopener noreferrer" className="block">
                                    <img
                                      src={attachment.url}
                                      alt={attachment.name}
                                      className="max-w-full max-h-60 rounded object-cover cursor-pointer hover:opacity-90 transition-opacity"
                                    />
                                  </a>
                                ) : (
                                  <a
                                    href={attachment.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center gap-2 p-2 rounded ${isOwn ? 'bg-black/5 hover:bg-black/10' : 'bg-white/5 hover:bg-white/10'} transition-colors`}
                                  >
                                    <FileText className="w-4 h-4 flex-shrink-0" />
                                    <span className="text-xs truncate flex-1">{attachment.name}</span>
                                    <Download className="w-3 h-3 flex-shrink-0 opacity-50" />
                                  </a>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <div className={`flex items-center justify-end gap-1 mt-1 ${isOwn ? 'text-black/40' : 'text-white/30'}`}>
                          <span className="text-[10px]">
                            {format(new Date(message.created_at), "HH:mm")}
                          </span>
                          {isOwn && (
                            message.is_read ? <CheckCheck className="w-3 h-3 text-emerald-500" /> : <Check className="w-3 h-3" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/[0.06]">
              {/* Upload Error */}
              {uploadError && (
                <div className="mb-2 px-3 py-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center justify-between">
                  <span>{uploadError}</span>
                  <button onClick={() => setUploadError(null)} className="ml-2 hover:text-red-300">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
              
              {/* Pending Files Preview */}
              {pendingFiles.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {pendingFiles.map((file, index) => (
                    <div
                      key={index}
                      className="relative group bg-white/5 border border-white/10 p-2 flex items-center gap-2"
                    >
                      {file.type.startsWith('image/') ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <div className="w-12 h-12 flex items-center justify-center bg-white/5 rounded">
                          <FileText className="w-5 h-5 text-white/40" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-white/70 truncate max-w-[120px]">{file.name}</p>
                        <p className="text-[10px] text-white/40">{(file.size / 1024).toFixed(1)} KB</p>
                      </div>
                      <button
                        onClick={() => removePendingFile(index)}
                        className="p-1 hover:bg-white/10 rounded transition-colors"
                      >
                        <X className="w-3 h-3 text-white/50" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex items-end gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="p-2.5 hover:bg-white/[0.04] transition-colors cursor-pointer relative"
                >
                  <Paperclip className={`w-4 h-4 ${pendingFiles.length > 0 ? 'text-blue-400' : 'text-white/40'}`} />
                  {pendingFiles.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white text-[10px] flex items-center justify-center">
                      {pendingFiles.length}
                    </span>
                  )}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png,.webp,.gif,.doc,.docx,.xls,.xlsx,.zip,.txt"
                  multiple
                  onChange={handleFileSelect}
                />
                <div className="flex-1 relative">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    placeholder={pendingFiles.length > 0 ? "Ajoutez un message (optionnel)..." : "Ecrivez votre message..."}
                    rows={1}
                    className="w-full bg-white/[0.03] border border-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/10 resize-none"
                  />
                </div>
                <button
                  onClick={sendMessage}
                  disabled={(!newMessage.trim() && pendingFiles.length === 0) || isSending}
                  className="p-2.5 bg-white text-black hover:bg-white/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                >
                  {isSending ? (
                    <div className="flex items-center gap-1">
                      {isUploading && <Loader2 className="w-4 h-4 animate-spin" />}
                      {!isUploading && <div className="w-4 h-4 border-2 border-black/20 border-t-black animate-spin rounded-full" />}
                    </div>
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-white/40">
            <div className="text-center">
              <MessageSquare className="w-8 h-8 mx-auto mb-4 opacity-40" />
              <p className="text-sm text-white/50">Selectionnez une conversation</p>
              <p className="text-xs text-white/30">ou creez-en une nouvelle</p>
            </div>
          </div>
        )}
      </div>

      {/* Context Menu */}
      {contextMenu && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={closeContextMenu}
          />
          <div
            className="fixed z-50 bg-[#0a0a0a] border border-white/10 py-1 min-w-[180px] shadow-xl"
            style={{ left: contextMenu.x, top: contextMenu.y }}
          >
            {(() => {
              const targetConv = conversations.find(c => c.id === contextMenu.conversationId);
              const isArchived = targetConv?.status === 'archived';
              const hasUnread = (targetConv?.unread_count ?? 0) > 0;
              return (
                <>
                  {hasUnread && (
                    <button
                      onClick={() => markAsRead(contextMenu.conversationId)}
                      className="w-full px-4 py-2 text-left text-sm text-white/70 hover:bg-white/[0.06] flex items-center gap-3 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      Marquer comme lu
                    </button>
                  )}
                  <button
                    onClick={() => archiveConversation(contextMenu.conversationId)}
                    className="w-full px-4 py-2 text-left text-sm text-white/70 hover:bg-white/[0.06] flex items-center gap-3 transition-colors"
                  >
                    {isArchived ? (
                      <>
                        <ArchiveRestore className="w-4 h-4" />
                        Desarchiver
                      </>
                    ) : (
                      <>
                        <Archive className="w-4 h-4" />
                        Archiver
                      </>
                    )}
                  </button>
                  <div className="border-t border-white/10 my-1" />
                  <button
                    onClick={() => deleteConversation(contextMenu.conversationId)}
                    className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-3 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Supprimer
                  </button>
                </>
              );
            })()}
          </div>
        </>
      )}

      {/* Assign Staff Modal (Admin only) */}
      {showAssignModal && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setShowAssignModal(null)}
        >
          <div
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="bg-[#0a0a0a] border border-white/[0.06] p-6 w-full max-w-md"
          >
            <div className="flex items-center justify-between mb-6">
              <p className="text-[10px] text-white/40 uppercase tracking-widest">Assigner à un membre de l&apos;équipe</p>
              <button
                onClick={() => setShowAssignModal(null)}
                className="p-1.5 hover:bg-white/[0.04] transition-colors"
              >
                <X className="w-4 h-4 text-white/40" />
              </button>
            </div>
            
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {staffList.length === 0 ? (
                <p className="text-white/40 text-sm text-center py-4">Aucun staff disponible</p>
              ) : (
                staffList.map((staff) => (
                  <button
                    key={staff.id}
                    onClick={() => assignConversationToStaff(showAssignModal, staff.id)}
                    className="w-full p-3 text-left bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.06] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/80 text-sm">{staff.first_name} {staff.last_name}</p>
                        <p className="text-white/40 text-xs">{staff.email}</p>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 bg-white/5 border border-white/10 text-white/40">
                        {staff.role === 'staff' ? 'Staff' : 'Dev'}
                      </span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* New Conversation Modal */}
      {showNewConversation && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => !isCreating && setShowNewConversation(false)}
        >
          <div
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            className="bg-[#0a0a0a] border border-white/[0.08] p-6 w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between mb-6">
              <p className="text-[10px] text-white/40 uppercase tracking-widest">Nouvelle conversation</p>
              <button
                onClick={() => !isCreating && setShowNewConversation(false)}
                disabled={isCreating}
                className="p-1.5 hover:bg-white/[0.06] transition-all duration-200 active:scale-90 disabled:opacity-50"
              >
                <X className="w-4 h-4 text-white/40" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/50 text-xs uppercase tracking-wider mb-2">Sujet</label>
                <input
                  type="text"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && newSubject.trim() && !isCreating) {
                      e.preventDefault();
                      createConversation();
                    }
                  }}
                  placeholder="Ex: Question sur mon projet..."
                  className="w-full bg-white/[0.03] border border-white/[0.08] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/20 transition-colors"
                  autoFocus
                  disabled={isCreating}
                />
              </div>
              
              <button
                onClick={createConversation}
                disabled={!newSubject.trim() || isCreating}
                className="w-full py-3 bg-white text-black text-sm font-medium hover:bg-white/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {isCreating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black/20 border-t-black animate-spin rounded-full" />
                    <span>Création en cours...</span>
                  </>
                ) : (
                  <span>Démarrer la conversation</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export type UserRole = 'user' | 'staff' | 'dev' | 'admin';
export type UserStatus = 'pending' | 'active' | 'suspended' | 'banned';

export interface User {
  id: string;
  clerk_id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  status: UserStatus;

  company: string | null;
  phone: string | null;
  notifications_email: boolean;
  notifications_messages: boolean;
  notifications_updates: boolean;
  created_at: string;
  updated_at: string;
  last_login_at: string | null;
  email_verified: boolean;
}

export interface UserSession {
  id: string;
  user_id: string;
  ip_address: string | null;
  user_agent: string | null;
  browser: string | null;
  os: string | null;
  device: string | null;
  country: string | null;
  city: string | null;
  started_at: string;
  ended_at: string | null;
  is_active: boolean;
}

export interface PageView {
  id: string;
  user_id: string;
  session_id: string;
  page_url: string;
  page_title: string | null;
  referrer: string | null;
  viewed_at: string;
  time_spent_seconds: number | null;
}

export interface Project {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  status: string;
  budget_min: number | null;
  budget_max: number | null;
  deadline: string | null;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  user_id: string;
  project_id: string | null;
  file_name: string;
  file_type: string;
  file_size: number | null;
  file_url: string;
  storage_path: string;
  document_type: string;
  is_contract: boolean;
  signed_at: string | null;
  created_at: string;
}

export interface Conversation {
  id: string;
  user_id: string;
  assigned_staff_id: string | null;
  subject: string | null;
  status: string;
  priority: string;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  is_read: boolean;
  read_at: string | null;
  attachments: Record<string, unknown>[] | null;
  created_at: string;
  sender?: User;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  is_read: boolean;
  link: string | null;
  created_at: string;
}

export interface AuditLog {
  id: string;
  user_id: string | null;
  action: string;
  entity_type: string | null;
  entity_id: string | null;
  old_values: Record<string, unknown> | null;
  new_values: Record<string, unknown> | null;
  ip_address: string | null;
  created_at: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  pendingUsers: number;
  totalConversations: number;
  openConversations: number;
  totalDocuments: number;
  totalProjects: number;
  recentActivity: AuditLog[];
}

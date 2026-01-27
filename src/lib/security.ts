import { z } from 'zod';

// ============ INPUT SANITIZATION ============
// Server-safe sanitization without DOMPurify (which requires window)

export function sanitizeInput(input: string): string {
  return input
    .replace(/<[^>]*>/g, '')
    .replace(/[<>'"&]/g, (char) => {
      const entities: Record<string, string> = {
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
        '&': '&amp;',
      };
      return entities[char] || char;
    })
    .trim();
}

export function sanitizeHtml(html: string): string {
  // Basic HTML sanitization - strips dangerous tags
  const allowedTags = ['b', 'i', 'em', 'strong', 'a', 'p', 'br'];
  const tagRegex = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
  
  return html.replace(tagRegex, (match, tag) => {
    if (allowedTags.includes(tag.toLowerCase())) {
      // Remove event handlers and dangerous attributes
      return match.replace(/\s(on\w+|javascript:|data:)/gi, '');
    }
    return '';
  });
}

export function escapeSQL(value: string): string {
  return value.replace(/'/g, "''").replace(/\\/g, '\\\\');
}

// ============ VALIDATION SCHEMAS ============

export const emailSchema = z.string().email('Invalid email address');

export const phoneSchema = z.string().regex(
  /^[\d\s\-+()]{8,20}$/,
  'Invalid phone number'
);

export const messageSchema = z.object({
  name: z.string().min(2, 'Name too short').max(100, 'Name too long'),
  email: emailSchema,
  phone: phoneSchema.optional(),
  subject: z.string().min(5, 'Subject too short').max(200, 'Subject too long'),
  message: z.string().min(10, 'Message too short').max(5000, 'Message too long'),
});

export const projectSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().max(5000).optional(),
  status: z.enum(['pending', 'in_progress', 'completed', 'cancelled']),
  budget: z.number().positive().optional(),
});

export const userProfileSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  phone: phoneSchema.optional(),
  company: z.string().max(100).optional(),
});

// ============ VALIDATION FUNCTIONS ============

export function validateEmail(email: string): boolean {
  return emailSchema.safeParse(email).success;
}

export function validatePhone(phone: string): boolean {
  return phoneSchema.safeParse(phone).success;
}

// ============ SECURITY TOKENS ============

export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(array);
  } else {
    // Fallback for server-side
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
  }
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export function generateSecureToken(length: number = 32): string {
  const array = new Uint8Array(length);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(array);
  } else {
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
  }
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

// ============ RATE LIMITING ============

export function rateLimitKey(identifier: string, action: string): string {
  return `ratelimit:${action}:${identifier}`;
}

export const RATE_LIMITS = {
  login: { maxAttempts: 5, windowMs: 15 * 60 * 1000 },
  register: { maxAttempts: 3, windowMs: 60 * 60 * 1000 },
  message: { maxAttempts: 30, windowMs: 60 * 1000 },
  upload: { maxAttempts: 10, windowMs: 60 * 1000 },
  api: { maxAttempts: 100, windowMs: 60 * 1000 },
};

// In-memory rate limiter for serverless
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(key: string, limit: { maxAttempts: number; windowMs: number }): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(key);
  
  if (!record || record.resetAt < now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + limit.windowMs });
    return true;
  }
  
  if (record.count >= limit.maxAttempts) {
    return false;
  }
  
  record.count++;
  return true;
}

// ============ FILE VALIDATION ============

export const ALLOWED_FILE_TYPES = {
  images: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  documents: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  all: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'],
};

export const MAX_FILE_SIZES = {
  image: 5 * 1024 * 1024, // 5MB
  document: 10 * 1024 * 1024, // 10MB
  default: 5 * 1024 * 1024,
};

export function validateFileType(mimeType: string, allowedTypes: string[]): boolean {
  return allowedTypes.includes(mimeType);
}

export function validateFileSize(size: number, maxSize: number): boolean {
  return size <= maxSize;
}

// ============ AUDIT LOGGING ============

export interface AuditLogEntry {
  timestamp: Date;
  userId?: string;
  action: string;
  resource: string;
  details?: Record<string, unknown>;
  ip?: string;
  userAgent?: string;
}

export function createAuditLog(entry: Omit<AuditLogEntry, 'timestamp'>): AuditLogEntry {
  return {
    ...entry,
    timestamp: new Date(),
  };
}

/**
 * Server-side file validation utilities
 * Provides additional security layer for file uploads
 */

// Magic bytes for common file types
const FILE_SIGNATURES: Record<string, number[][]> = {
  // Images
  'image/jpeg': [[0xFF, 0xD8, 0xFF]],
  'image/png': [[0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]],
  'image/gif': [[0x47, 0x49, 0x46, 0x38, 0x37, 0x61], [0x47, 0x49, 0x46, 0x38, 0x39, 0x61]],
  'image/webp': [[0x52, 0x49, 0x46, 0x46]], // RIFF header, need to check WEBP after
  
  // Documents
  'application/pdf': [[0x25, 0x50, 0x44, 0x46]], // %PDF
  
  // Office documents (ZIP-based)
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [[0x50, 0x4B, 0x03, 0x04]],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [[0x50, 0x4B, 0x03, 0x04]],
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': [[0x50, 0x4B, 0x03, 0x04]],
  
  // Legacy Office
  'application/msword': [[0xD0, 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1]],
  'application/vnd.ms-excel': [[0xD0, 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1]],
  
  // Archives
  'application/zip': [[0x50, 0x4B, 0x03, 0x04], [0x50, 0x4B, 0x05, 0x06]],
};

// Allowed MIME types for uploads
export const ALLOWED_MIME_TYPES = {
  documents: [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/zip',
    'text/plain',
  ],
  messages: [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/zip',
    'text/plain',
  ],
};

// Maximum file sizes
export const MAX_FILE_SIZES = {
  documents: 50 * 1024 * 1024, // 50MB
  messages: 10 * 1024 * 1024,  // 10MB
  images: 5 * 1024 * 1024,     // 5MB
};

// Dangerous file extensions that should never be allowed
const DANGEROUS_EXTENSIONS = [
  '.exe', '.bat', '.cmd', '.com', '.pif', '.scr', '.vbs', '.vbe',
  '.js', '.jse', '.ws', '.wsf', '.wsc', '.wsh', '.ps1', '.ps1xml',
  '.ps2', '.ps2xml', '.psc1', '.psc2', '.msh', '.msh1', '.msh2',
  '.mshxml', '.msh1xml', '.msh2xml', '.scf', '.lnk', '.inf', '.reg',
  '.dll', '.cpl', '.msc', '.jar', '.hta', '.htm', '.html', '.php',
  '.asp', '.aspx', '.jsp', '.py', '.rb', '.pl', '.sh', '.bash',
];

/**
 * Validate file extension
 */
export function validateFileExtension(filename: string): { valid: boolean; error?: string } {
  const ext = filename.toLowerCase().substring(filename.lastIndexOf('.'));
  
  if (DANGEROUS_EXTENSIONS.includes(ext)) {
    return { valid: false, error: `Extension ${ext} non autorisée pour des raisons de sécurité` };
  }
  
  return { valid: true };
}

/**
 * Validate MIME type
 */
export function validateMimeType(
  mimeType: string, 
  context: 'documents' | 'messages' = 'documents'
): { valid: boolean; error?: string } {
  const allowed = ALLOWED_MIME_TYPES[context];
  
  if (!allowed.includes(mimeType)) {
    return { valid: false, error: `Type de fichier ${mimeType} non autorisé` };
  }
  
  return { valid: true };
}

/**
 * Validate file size
 */
export function validateFileSize(
  size: number, 
  context: 'documents' | 'messages' | 'images' = 'documents'
): { valid: boolean; error?: string } {
  const maxSize = MAX_FILE_SIZES[context];
  
  if (size > maxSize) {
    const maxMB = Math.round(maxSize / (1024 * 1024));
    return { valid: false, error: `Fichier trop volumineux (max ${maxMB}MB)` };
  }
  
  return { valid: true };
}

/**
 * Validate file magic bytes (for server-side validation)
 * This should be called with the first 8 bytes of the file
 */
export function validateMagicBytes(
  bytes: Uint8Array, 
  declaredMimeType: string
): { valid: boolean; error?: string } {
  const signatures = FILE_SIGNATURES[declaredMimeType];
  
  // If we don't have signatures for this type, allow it (rely on other checks)
  if (!signatures) {
    return { valid: true };
  }
  
  // Check if any signature matches
  for (const signature of signatures) {
    let matches = true;
    for (let i = 0; i < signature.length; i++) {
      if (bytes[i] !== signature[i]) {
        matches = false;
        break;
      }
    }
    if (matches) {
      return { valid: true };
    }
  }
  
  return { 
    valid: false, 
    error: 'Le contenu du fichier ne correspond pas au type déclaré' 
  };
}

/**
 * Full file validation
 */
export function validateFile(
  file: { name: string; type: string; size: number },
  context: 'documents' | 'messages' = 'documents'
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Validate extension
  const extResult = validateFileExtension(file.name);
  if (!extResult.valid && extResult.error) {
    errors.push(extResult.error);
  }
  
  // Validate MIME type
  const mimeResult = validateMimeType(file.type, context);
  if (!mimeResult.valid && mimeResult.error) {
    errors.push(mimeResult.error);
  }
  
  // Validate size
  const sizeResult = validateFileSize(file.size, context);
  if (!sizeResult.valid && sizeResult.error) {
    errors.push(sizeResult.error);
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Sanitize filename for storage
 */
export function sanitizeFilename(filename: string): string {
  // Remove path traversal attempts
  let sanitized = filename.replace(/\.\./g, '');
  
  // Remove directory separators
  sanitized = sanitized.replace(/[/\\]/g, '');
  
  // Remove null bytes
  sanitized = sanitized.replace(/\0/g, '');
  
  // Keep only safe characters
  sanitized = sanitized.replace(/[^a-zA-Z0-9._-]/g, '_');
  
  // Limit length
  if (sanitized.length > 200) {
    const ext = sanitized.substring(sanitized.lastIndexOf('.'));
    sanitized = sanitized.substring(0, 200 - ext.length) + ext;
  }
  
  return sanitized;
}

/**
 * Client-side encryption utilities using Web Crypto API (AES-256-GCM)
 * 
 * Purpose: Encrypt sensitive API payloads so that even if traffic is
 * intercepted via proxy (Burp Suite, mitmproxy, etc.), the data is
 * unreadable without the session-derived encryption key.
 * 
 * Flow:
 * 1. Client derives a key from session token + server salt using PBKDF2
 * 2. Client encrypts sensitive payload with AES-256-GCM
 * 3. Server decrypts using the same derived key
 * 
 * Note: This is defense-in-depth. TLS already encrypts transport.
 * This adds application-layer encryption for sensitive operations.
 */

// Encode string to Uint8Array
function encode(text: string): ArrayBuffer {
  return new TextEncoder().encode(text).buffer as ArrayBuffer;
}

// Decode Uint8Array to string
function decode(buffer: ArrayBuffer): string {
  return new TextDecoder().decode(buffer);
}

// Convert ArrayBuffer to base64
function bufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Convert base64 to ArrayBuffer
function base64ToBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

/**
 * Derive an AES-256-GCM key from a session token and salt using PBKDF2
 */
export async function deriveKey(
  sessionToken: string,
  salt: string
): Promise<CryptoKey> {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encode(sessionToken),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encode(salt),
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

/**
 * Encrypt data with AES-256-GCM
 * Returns base64-encoded string: iv:ciphertext
 */
export async function encrypt(
  data: string,
  key: CryptoKey
): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ivBuffer = iv.buffer as ArrayBuffer;
  
  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: ivBuffer },
    key,
    encode(data)
  );

  return `${bufferToBase64(ivBuffer)}:${bufferToBase64(ciphertext)}`;
}

/**
 * Decrypt AES-256-GCM encrypted data
 * Expects base64-encoded string: iv:ciphertext
 */
export async function decrypt(
  encryptedData: string,
  key: CryptoKey
): Promise<string> {
  const [ivBase64, ciphertextBase64] = encryptedData.split(':');
  if (!ivBase64 || !ciphertextBase64) {
    throw new Error('Invalid encrypted data format');
  }

  const ivBuffer = base64ToBuffer(ivBase64);
  const ciphertext = base64ToBuffer(ciphertextBase64);

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: ivBuffer },
    key,
    ciphertext
  );

  return decode(decrypted);
}

/**
 * Generate HMAC-SHA256 signature for request integrity verification
 * Prevents request tampering by proxy
 */
export async function signPayload(
  payload: string,
  secret: string
): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, encode(payload));
  return bufferToBase64(signature as ArrayBuffer);
}

/**
 * Verify HMAC-SHA256 signature
 */
export async function verifySignature(
  payload: string,
  signature: string,
  secret: string
): Promise<boolean> {
  const key = await crypto.subtle.importKey(
    'raw',
    encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );

  return crypto.subtle.verify('HMAC', key, base64ToBuffer(signature), encode(payload));
}

/**
 * Generate a random salt for key derivation
 */
export function generateSalt(): string {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  return bufferToBase64(salt.buffer as ArrayBuffer);
}

/**
 * Hash data with SHA-256 (for integrity checks)
 */
export async function sha256(data: string): Promise<string> {
  const hash = await crypto.subtle.digest('SHA-256', encode(data));
  return bufferToBase64(hash as ArrayBuffer);
}

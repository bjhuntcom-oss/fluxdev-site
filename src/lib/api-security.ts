/**
 * API Security Layer — Anti-interception & Anti-tampering
 * 
 * Protections against proxy interception (Burp Suite, mitmproxy, Charles):
 * 
 * 1. Request Signing (HMAC-SHA256):
 *    - Every sensitive API request is signed with a session-derived key
 *    - Server verifies signature → tampered requests are rejected
 * 
 * 2. Timestamp Validation:
 *    - Requests include a timestamp, server rejects if too old (replay attack)
 * 
 * 3. Payload Integrity:
 *    - SHA-256 hash of body is included in signature
 *    - Modified body = invalid signature
 * 
 * Limitations (honest assessment):
 * - SSL pinning is NOT possible in browsers (only native mobile apps)
 * - A determined attacker with full device control CAN bypass any client-side protection
 * - These measures raise the bar significantly but are not absolute
 * - HPKP is deprecated by all browsers since 2019
 * 
 * What IS effective:
 * - HSTS preload: prevents SSL downgrade attacks
 * - CSP: prevents script injection by proxy
 * - Encrypted payloads: intercepted data is unreadable
 * - Request signing: tampered requests are detected and rejected
 * - Cache-Control: no-store on sensitive routes prevents data leakage
 */

const TIMESTAMP_TOLERANCE_MS = 30_000; // 30 seconds

/**
 * Generate request signature headers for a fetch call
 * Client-side: call before sending sensitive API requests
 */
export async function signRequest(
  method: string,
  url: string,
  body: string | null,
  sessionToken: string
): Promise<Record<string, string>> {
  const timestamp = Date.now().toString();
  const bodyHash = body
    ? await hashString(body)
    : 'empty';
  
  const message = `${method}:${url}:${timestamp}:${bodyHash}`;
  const signature = await hmacSign(message, sessionToken);

  return {
    'X-Request-Timestamp': timestamp,
    'X-Request-Signature': signature,
    'X-Body-Hash': bodyHash,
  };
}

/**
 * Verify request signature on the server side
 * Returns true if valid, false if tampered
 */
export async function verifyRequest(
  method: string,
  url: string,
  body: string | null,
  headers: {
    timestamp: string;
    signature: string;
    bodyHash: string;
  },
  sessionToken: string
): Promise<{ valid: boolean; reason?: string }> {
  // Check timestamp (prevent replay attacks)
  const requestTime = parseInt(headers.timestamp, 10);
  if (isNaN(requestTime)) {
    return { valid: false, reason: 'Invalid timestamp' };
  }
  
  const now = Date.now();
  if (Math.abs(now - requestTime) > TIMESTAMP_TOLERANCE_MS) {
    return { valid: false, reason: 'Request expired (possible replay attack)' };
  }

  // Verify body hash
  const expectedBodyHash = body ? await hashString(body) : 'empty';
  if (headers.bodyHash !== expectedBodyHash) {
    return { valid: false, reason: 'Body tampered' };
  }

  // Verify signature
  const message = `${method}:${url}:${headers.timestamp}:${headers.bodyHash}`;
  const expectedSignature = await hmacSign(message, sessionToken);
  
  if (expectedSignature !== headers.signature) {
    return { valid: false, reason: 'Invalid signature (possible tampering)' };
  }

  return { valid: true };
}

/**
 * HMAC-SHA256 signing using Web Crypto API
 */
async function hmacSign(message: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret).buffer as ArrayBuffer,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(message).buffer as ArrayBuffer
  );

  return arrayBufferToHex(signature);
}

/**
 * SHA-256 hash of a string
 */
async function hashString(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const hash = await crypto.subtle.digest(
    'SHA-256',
    encoder.encode(data).buffer as ArrayBuffer
  );
  return arrayBufferToHex(hash);
}

/**
 * Convert ArrayBuffer to hex string
 */
function arrayBufferToHex(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Secure fetch wrapper that automatically signs requests
 * Use for sensitive API calls (admin actions, user data mutations)
 */
export async function secureFetch(
  url: string,
  options: RequestInit & { sessionToken?: string } = {}
): Promise<Response> {
  const { sessionToken, ...fetchOptions } = options;
  
  if (sessionToken) {
    const method = (fetchOptions.method || 'GET').toUpperCase();
    const body = typeof fetchOptions.body === 'string' ? fetchOptions.body : null;
    
    const securityHeaders = await signRequest(method, url, body, sessionToken);
    
    fetchOptions.headers = {
      ...fetchOptions.headers,
      ...securityHeaders,
    };
  }

  return fetch(url, fetchOptions);
}

export const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;
export const ENGLISH_ONLY_REGEX = /^[\x20-\x7E\r\n\t₹–—•…'’"“”]+$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function sanitizeMobileInput(raw: string): string {
  const digitsOnly = raw.replace(/\D/g, '');
  if (digitsOnly.length > 10 && digitsOnly.startsWith('91')) {
    return digitsOnly.slice(2, 12);
  }
  return digitsOnly.slice(0, 10);
}

export function isValidIndianMobile(mobile: string): boolean {
  return INDIAN_MOBILE_REGEX.test(mobile.trim());
}

export function isEnglishOnly(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed) return true;
  return ENGLISH_ONLY_REGEX.test(trimmed);
}

export function isValidEmail(email: string): boolean {
  const trimmed = email.trim();
  if (!trimmed) return true;
  return EMAIL_REGEX.test(trimmed);
}

export function generateLeadId(prefix: 'CNT' | 'ENQ'): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${yy}${mm}${dd}-${rand}`;
}

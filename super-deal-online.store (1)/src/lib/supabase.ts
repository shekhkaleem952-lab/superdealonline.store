import { createClient } from '@supabase/supabase-js';

const rawUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const rawKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

function getValidSupabaseUrl(url: string): string {
  if (!url) return '';
  let formattedUrl = url.trim();

  // Handle pure project reference ID (e.g. dmadyztgbvcpycqoqeoz)
  if (!formattedUrl.includes('.') && !formattedUrl.includes('/') && !formattedUrl.includes(':')) {
    formattedUrl = `https://${formattedUrl}.supabase.co`;
  } else if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
    formattedUrl = `https://${formattedUrl}`;
  }

  try {
    const parsed = new URL(formattedUrl);
    if (!parsed.hostname.includes('.')) {
      return `https://${parsed.hostname}.supabase.co`;
    }
    if ((parsed.protocol === 'http:' || parsed.protocol === 'https:') && parsed.hostname.includes('.')) {
      return parsed.toString().replace(/\/$/, '');
    }
  } catch {
    return '';
  }
  return '';
}

const validatedUrl = getValidSupabaseUrl(rawUrl);

export const isSupabaseConfigured = Boolean(
  validatedUrl &&
  rawKey &&
  rawKey.length > 10 &&
  !rawUrl.includes('placeholder') &&
  !rawKey.includes('placeholder') &&
  !rawUrl.includes('YOUR_SUPABASE') &&
  !rawKey.includes('YOUR_SUPABASE')
);

if (!isSupabaseConfigured) {
  console.info(
    'ℹ️ Supabase credentials not found or invalid in environment. Running in local mode with mock data fallback.'
  );
}

// Export Supabase client (guaranteed valid HTTP/HTTPS URL to prevent runtime crash)
export const supabase = createClient(
  isSupabaseConfigured ? validatedUrl : 'https://placeholder.supabase.co',
  isSupabaseConfigured ? rawKey : 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);


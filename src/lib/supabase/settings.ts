'use server';

import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { SiteSettings } from '@/types';

const defaultSettings: SiteSettings = {
  title: 'Esmerosound',
  description: 'Radio online con la mejor programación.',
  facebookUrl: 'https://facebook.com',
  instagramUrl: 'https://instagram.com',
  twitterUrl: 'https://twitter.com',
  streamingSource: 'azuracast',
};

export async function getSettings(): Promise<SiteSettings> {
  if (!isSupabaseConfigured) {
    console.warn('Supabase no configurado, usando configuración por defecto.');
    return defaultSettings;
  }

  const { data, error } = await supabase
    .from('settings')
    .select('key, value');

  if (error || !data?.length) return defaultSettings;

  const merged: Record<string, unknown> = { ...defaultSettings };
  for (const row of data) {
    merged[row.key] = row.value;
  }

  return merged as SiteSettings;
}

export async function updateSettings(settingsData: Partial<SiteSettings>) {
  if (!isSupabaseConfigured) throw new Error('Supabase no configurado. No se puede guardar configuración.');

  const upserts = Object.entries(settingsData).map(([key, value]) => ({
    key,
    value,
    updated_at: new Date().toISOString(),
  }));

  const { error } = await supabase
    .from('settings')
    .upsert(upserts, { onConflict: 'key' });

  if (error) throw new Error('No se pudo actualizar la configuración: ' + error.message);
}

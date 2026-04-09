'use server';

import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { NewsArticle } from '@/types';
import { newsArticles as seedData } from '@/lib/news-data';

export type NewsArticleData = Omit<NewsArticle, 'id' | 'createdAt' | 'date'>;

export async function addNewsArticle(articleData: NewsArticleData) {
  if (!isSupabaseConfigured) throw new Error('Supabase no configurado. No se puede agregar artículo.');
  const { data, error } = await supabase
    .from('news')
    .insert([{ ...articleData, date: new Date().toISOString().split('T')[0] }])
    .select()
    .single();
  if (error) throw new Error('No se pudo agregar la noticia: ' + error.message);
  return { id: data.id };
}

export async function getNewsArticles(articleLimit: number = 20): Promise<NewsArticle[]> {
  const getSeedData = () => seedData.map(a => ({ ...a, createdAt: Date.now() })).slice(0, articleLimit);

  if (!isSupabaseConfigured) {
    console.warn('Supabase no configurado, usando datos de ejemplo.');
    return getSeedData();
  }

  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(articleLimit);

  if (error || !data?.length) {
    console.warn('Colección vacía o error, usando datos de ejemplo.', error);
    return getSeedData();
  }

  return data.map(row => ({
    ...row,
    id: row.id,
    createdAt: new Date(row.created_at).getTime(),
  })) as NewsArticle[];
}

export async function getNewsArticleById(id: string): Promise<NewsArticle | null> {
  const getSeedArticle = () => {
    const found = seedData.find(a => a.id === id);
    return found ? { ...found, createdAt: Date.now() } : null;
  };

  if (!isSupabaseConfigured) return getSeedArticle();

  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return getSeedArticle();

  return { ...data, createdAt: new Date(data.created_at).getTime() } as NewsArticle;
}

export async function updateNewsArticle(id: string, articleData: Partial<NewsArticleData>) {
  if (!isSupabaseConfigured) throw new Error('Supabase no configurado. No se puede actualizar.');
  const { error } = await supabase.from('news').update(articleData).eq('id', id);
  if (error) throw new Error('No se pudo actualizar: ' + error.message);
}

export async function deleteNewsArticle(id: string) {
  if (!isSupabaseConfigured) throw new Error('Supabase no configurado. No se puede eliminar.');
  const { error } = await supabase.from('news').delete().eq('id', id);
  if (error) throw new Error('No se pudo eliminar: ' + error.message);
}

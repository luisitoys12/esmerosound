'use server';

import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { Slide } from '@/types';
import { slides as seedData } from '@/lib/slideshow-data';

export type SlideData = Omit<Slide, 'id' | 'createdAt'>;

export async function addSlide(slideData: SlideData) {
  if (!isSupabaseConfigured) throw new Error('Supabase no configurado. No se puede agregar slide.');
  const { data, error } = await supabase
    .from('slideshow')
    .insert([slideData])
    .select()
    .single();
  if (error) throw new Error('No se pudo agregar el slide: ' + error.message);
  return { id: data.id };
}

export async function getSlides(slideLimit: number = 5): Promise<Slide[]> {
  const getSeedData = () => seedData.map(s => ({ ...s, createdAt: Date.now() })).slice(0, slideLimit);

  if (!isSupabaseConfigured) {
    console.warn('Supabase no configurado, usando datos de ejemplo.');
    return getSeedData();
  }

  const { data, error } = await supabase
    .from('slideshow')
    .select('*')
    .order('order_index', { ascending: true })
    .limit(slideLimit);

  if (error || !data?.length) {
    console.warn('Colección vacía o error, usando datos de ejemplo.', error);
    return getSeedData();
  }

  return data.map(row => ({
    ...row,
    id: row.id,
    createdAt: new Date(row.created_at).getTime(),
  })) as Slide[];
}

export async function getSlideById(id: string): Promise<Slide | null> {
  const getSeedSlide = () => {
    const found = seedData.find(s => s.id === id);
    return found ? { ...found, createdAt: Date.now() } : null;
  };

  if (!isSupabaseConfigured) return getSeedSlide();

  const { data, error } = await supabase
    .from('slideshow')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return getSeedSlide();

  return { ...data, createdAt: new Date(data.created_at).getTime() } as Slide;
}

export async function updateSlide(id: string, slideData: Partial<SlideData>) {
  if (!isSupabaseConfigured) throw new Error('Supabase no configurado. No se puede actualizar.');
  const { error } = await supabase.from('slideshow').update(slideData).eq('id', id);
  if (error) throw new Error('No se pudo actualizar: ' + error.message);
}

export async function deleteSlide(id: string) {
  if (!isSupabaseConfigured) throw new Error('Supabase no configurado. No se puede eliminar.');
  const { error } = await supabase.from('slideshow').delete().eq('id', id);
  if (error) throw new Error('No se pudo eliminar: ' + error.message);
}

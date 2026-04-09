'use server';

import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { TeamMember } from '@/types';
import { teamMembers as seedData } from '@/lib/team-data';

export type TeamMemberData = Omit<TeamMember, 'id' | 'createdAt'>;

export async function addTeamMember(memberData: TeamMemberData) {
  if (!isSupabaseConfigured) throw new Error('Supabase no configurado. No se puede agregar miembro.');
  const { data, error } = await supabase
    .from('team')
    .insert([memberData])
    .select()
    .single();
  if (error) throw new Error('No se pudo agregar el miembro: ' + error.message);
  return { id: data.id };
}

export async function getTeamMembers(memberLimit: number = 20): Promise<TeamMember[]> {
  const getSeedData = () => seedData.map(m => ({ ...m, createdAt: Date.now() })).slice(0, memberLimit);

  if (!isSupabaseConfigured) {
    console.warn('Supabase no configurado, usando datos de ejemplo.');
    return getSeedData();
  }

  const { data, error } = await supabase
    .from('team')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(memberLimit);

  if (error || !data?.length) {
    console.warn('Colección vacía o error, usando datos de ejemplo.', error);
    return getSeedData();
  }

  return data.map(row => ({
    ...row,
    id: row.id,
    createdAt: new Date(row.created_at).getTime(),
  })) as TeamMember[];
}

export async function getTeamMemberById(id: string): Promise<TeamMember | null> {
  const getSeedMember = () => {
    const found = seedData.find(m => m.id === id);
    return found ? { ...found, createdAt: Date.now() } : null;
  };

  if (!isSupabaseConfigured) return getSeedMember();

  const { data, error } = await supabase
    .from('team')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return getSeedMember();

  return { ...data, createdAt: new Date(data.created_at).getTime() } as TeamMember;
}

export async function updateTeamMember(id: string, memberData: Partial<TeamMemberData>) {
  if (!isSupabaseConfigured) throw new Error('Supabase no configurado. No se puede actualizar.');
  const { error } = await supabase.from('team').update(memberData).eq('id', id);
  if (error) throw new Error('No se pudo actualizar: ' + error.message);
}

export async function deleteTeamMember(id: string) {
  if (!isSupabaseConfigured) throw new Error('Supabase no configurado. No se puede eliminar.');
  const { error } = await supabase.from('team').delete().eq('id', id);
  if (error) throw new Error('No se pudo eliminar: ' + error.message);
}

'use server';

import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { TeamMember } from '@/types';
import { teamMembers as seedData } from '@/lib/team-data';

const isFirebaseConfigured = process.env.NEXT_PUBLIC_FIREBASE_API_KEY && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

const teamCollection = collection(db, 'team');

export type TeamMemberData = Omit<TeamMember, 'id' | 'createdAt'>;

export async function addTeamMember(memberData: TeamMemberData) {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured. Cannot add team member.");
  }
  try {
    const docRef = await addDoc(teamCollection, {
      ...memberData,
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id };
  } catch (error) {
    console.error("Error adding team member: ", error);
    throw new Error("Could not add team member.");
  }
}

export async function getTeamMembers(memberLimit: number = 20): Promise<TeamMember[]> {
  const getSeedData = () => seedData.map(member => ({ ...member, createdAt: new Date().getTime() })).slice(0, memberLimit);

  if (!isFirebaseConfigured) {
    console.warn("Firebase config is missing, returning seed team data.");
    return getSeedData();
  }
  
  try {
    const q = query(teamCollection, orderBy('createdAt', 'desc'), limit(memberLimit));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log("Team collection is empty. Returning seed data as a fallback.");
      return getSeedData();
    }

    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toMillis() || new Date().getTime(),
      } as TeamMember;
    });
  } catch (error) {
    console.error("Error getting team members, returning seed data. This is likely due to missing Firebase credentials or a disabled API.", error);
    return getSeedData();
  }
}

export async function getTeamMemberById(id: string): Promise<TeamMember | null> {
  const getSeedMember = () => {
    const seedMember = seedData.find(member => member.id === id);
    return seedMember ? { ...seedMember, createdAt: new Date().getTime() } : null;
  }

  if (!isFirebaseConfigured) {
    console.warn("Firebase config is missing, returning seed team member data for ID:", id);
    return getSeedMember();
  }

  try {
    const docRef = doc(db, 'team', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toMillis() || new Date().getTime(),
      } as TeamMember;
    } else {
      // If not in Firebase, check seed data.
      return getSeedMember();
    }
  } catch (error) {
    console.error("Error getting team member by ID, returning seed data. This is likely due to missing Firebase credentials or a disabled API.", error);
    return getSeedMember();
  }
}

export async function updateTeamMember(id: string, memberData: Partial<TeamMemberData>) {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured. Cannot update team member.");
  }
  try {
    const docRef = doc(db, 'team', id);
    await updateDoc(docRef, memberData);
  } catch (error) {
    console.error("Error updating team member: ", error);
    throw new Error("Could not update team member.");
  }
}

export async function deleteTeamMember(id: string) {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured. Cannot delete team member.");
  }
  try {
    const docRef = doc(db, 'team', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting team member: ", error);
    throw new Error("Could not delete team member.");
  }
}

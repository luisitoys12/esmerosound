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

// Add a new team member
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

// Get all team members, sorted by creation date
export async function getTeamMembers(memberLimit: number = 20): Promise<TeamMember[]> {
  if (!isFirebaseConfigured) {
    console.warn("Firebase config is missing, returning seed team data.");
    return seedData.map(member => ({ ...member, createdAt: new Date().getTime() })).slice(0, memberLimit);
  }
  try {
    const q = query(teamCollection, orderBy('createdAt', 'desc'), limit(memberLimit));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log("Team collection is empty. Seeding with example data...");
      for (const member of seedData) {
        const { id, createdAt, ...memberData } = member;
        await addDoc(teamCollection, {
          ...memberData,
          createdAt: serverTimestamp(),
        });
      }
      const newSnapshot = await getDocs(q);
      if (newSnapshot.empty) {
        return seedData.map(member => ({ ...member, createdAt: new Date().getTime() })).slice(0, memberLimit);
      }
      return newSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toMillis() || new Date().getTime(),
        } as TeamMember;
      });
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
    return seedData.map(member => ({ ...member, createdAt: new Date().getTime() })).slice(0, memberLimit);
  }
}

// Get a single team member by ID
export async function getTeamMemberById(id: string): Promise<TeamMember | null> {
  if (!isFirebaseConfigured) {
    console.warn("Firebase config is missing, returning seed team member data for ID:", id);
    const seedMember = seedData.find(member => member.id === id);
    return seedMember ? { ...seedMember, createdAt: new Date().getTime() } : null;
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
      const seedMember = seedData.find(member => member.id === id);
      if (seedMember) {
        return { ...seedMember, createdAt: new Date().getTime() };
      }
      return null;
    }
  } catch (error) {
    console.error("Error getting team member by ID, returning seed data. This is likely due to missing Firebase credentials or a disabled API.", error);
    const seedMember = seedData.find(member => member.id === id);
    if (seedMember) {
      return { ...seedMember, createdAt: new Date().getTime() };
    }
    return null;
  }
}

// Update a team member
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

// Delete a team member
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

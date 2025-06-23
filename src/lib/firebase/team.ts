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

const teamCollection = collection(db, 'team');

export type TeamMemberData = Omit<TeamMember, 'id' | 'createdAt'>;

// Add a new team member
export async function addTeamMember(memberData: TeamMemberData) {
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
    console.error("Error getting team members, returning seed data. This is likely due to missing Firebase credentials.", error);
    return seedData.map(member => ({ ...member, createdAt: new Date().getTime() })).slice(0, memberLimit);
  }
}

// Get a single team member by ID
export async function getTeamMemberById(id: string): Promise<TeamMember | null> {
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
    console.error("Error getting team member by ID, returning seed data.", error);
    const seedMember = seedData.find(member => member.id === id);
    if (seedMember) {
      return { ...seedMember, createdAt: new Date().getTime() };
    }
    return null;
  }
}

// Update a team member
export async function updateTeamMember(id: string, memberData: Partial<TeamMemberData>) {
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
  try {
    const docRef = doc(db, 'team', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting team member: ", error);
    throw new Error("Could not delete team member.");
  }
}

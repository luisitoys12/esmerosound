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
import type { Slide } from '@/types';
import { slides as seedData } from '@/lib/slideshow-data';

const isFirebaseConfigured = process.env.NEXT_PUBLIC_FIREBASE_API_KEY && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

const slideshowCollection = collection(db, 'slideshow');

export type SlideData = Omit<Slide, 'id' | 'createdAt'>;

export async function addSlide(slideData: SlideData) {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured. Cannot add slide.");
  }
  try {
    const docRef = await addDoc(slideshowCollection, {
      ...slideData,
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id };
  } catch (error) {
    console.error("Error adding slide: ", error);
    throw new Error("Could not add slide.");
  }
}

export async function getSlides(slideLimit: number = 5): Promise<Slide[]> {
  const getSeedData = () => seedData.map(slide => ({ ...slide, createdAt: new Date().getTime() })).slice(0, slideLimit);

  if (!isFirebaseConfigured) {
    console.warn("Firebase config is missing, returning seed slideshow data.");
    return getSeedData();
  }

  try {
    const q = query(slideshowCollection, orderBy('createdAt', 'desc'), limit(slideLimit));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log("Slideshow collection is empty. Seeding with example data...");
      for (const slide of seedData) {
        const { id, createdAt, ...slideData } = slide;
        await addDoc(slideshowCollection, {
          ...slideData,
          createdAt: serverTimestamp(),
        });
      }
      return getSeedData();
    }

    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toMillis() || new Date().getTime(),
      } as Slide;
    });
  } catch (error) {
    console.error("Error getting slides, returning seed data. This is likely due to missing Firebase credentials or a disabled API.", error);
    return getSeedData();
  }
}

export async function getSlideById(id: string): Promise<Slide | null> {
   if (!isFirebaseConfigured) {
    console.warn("Firebase config is missing, returning null for slide ID:", id);
    return null;
  }
  try {
    const docRef = doc(db, 'slideshow', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toMillis() || new Date().getTime(),
      } as Slide;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting slide by ID.", error);
    return null;
  }
}

export async function updateSlide(id: string, slideData: Partial<SlideData>) {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured. Cannot update slide.");
  }
  try {
    const docRef = doc(db, 'slideshow', id);
    await updateDoc(docRef, slideData);
  } catch (error) {
    console.error("Error updating slide: ", error);
    throw new Error("Could not update slide.");
  }
}

export async function deleteSlide(id: string) {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured. Cannot delete slide.");
  }
  try {
    const docRef = doc(db, 'slideshow', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting slide: ", error);
    throw new Error("Could not delete slide.");
  }
}

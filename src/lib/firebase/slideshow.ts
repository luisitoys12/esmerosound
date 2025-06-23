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
import { db, isFirebaseConfigured } from '@/lib/firebase';
import type { Slide } from '@/types';
import { slides as seedData } from '@/lib/slideshow-data';

export type SlideData = Omit<Slide, 'id' | 'createdAt'>;

export async function addSlide(slideData: SlideData) {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firebase is not configured. Cannot add slide.");
  }
  const slideshowCollection = collection(db, 'slideshow');
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

  if (!isFirebaseConfigured || !db) {
    console.warn("Firebase config is missing, returning seed slideshow data.");
    return getSeedData();
  }

  const slideshowCollection = collection(db, 'slideshow');
  try {
    const q = query(slideshowCollection, orderBy('createdAt', 'desc'), limit(slideLimit));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log("Slideshow collection is empty. Returning seed data as a fallback.");
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
  const getSeedSlide = () => {
    const seedSlide = seedData.find(slide => slide.id === id);
    return seedSlide ? { ...seedSlide, createdAt: new Date().getTime() } : null;
  }

   if (!isFirebaseConfigured || !db) {
    console.warn("Firebase config is missing, returning seed slide data for ID:", id);
    return getSeedSlide();
  }
  const slideshowCollection = collection(db, 'slideshow');
  try {
    const docRef = doc(slideshowCollection, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toMillis() || new Date().getTime(),
      } as Slide;
    } else {
      return getSeedSlide();
    }
  } catch (error) {
    console.error("Error getting slide by ID.", error);
    return getSeedSlide();
  }
}

export async function updateSlide(id: string, slideData: Partial<SlideData>) {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firebase is not configured. Cannot update slide.");
  }
  const slideshowCollection = collection(db, 'slideshow');
  try {
    const docRef = doc(slideshowCollection, id);
    await updateDoc(docRef, slideData);
  } catch (error) {
    console.error("Error updating slide: ", error);
    throw new Error("Could not update slide.");
  }
}

export async function deleteSlide(id: string) {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firebase is not configured. Cannot delete slide.");
  }
  const slideshowCollection = collection(db, 'slideshow');
  try {
    const docRef = doc(slideshowCollection, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting slide: ", error);
    throw new Error("Could not delete slide.");
  }
}

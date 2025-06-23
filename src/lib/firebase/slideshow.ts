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

const slideshowCollection = collection(db, 'slideshow');

export type SlideData = Omit<Slide, 'id' | 'createdAt'>;

// Add a new slide
export async function addSlide(slideData: SlideData) {
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

// Get all slides, sorted by creation date
export async function getSlides(slideLimit: number = 5): Promise<Slide[]> {
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
      const newSnapshot = await getDocs(q);
      if (newSnapshot.empty) {
        return seedData.map(slide => ({ ...slide, createdAt: new Date().getTime() })).slice(0, slideLimit);
      }
      return newSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toMillis() || new Date().getTime(),
        } as Slide;
      });
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
    console.error("Error getting slides, returning seed data. This is likely due to missing Firebase credentials.", error);
    return seedData.map(slide => ({ ...slide, createdAt: new Date().getTime() })).slice(0, slideLimit);
  }
}

// Get a single slide by ID
export async function getSlideById(id: string): Promise<Slide | null> {
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

// Update a slide
export async function updateSlide(id: string, slideData: Partial<SlideData>) {
  try {
    const docRef = doc(db, 'slideshow', id);
    await updateDoc(docRef, slideData);
  } catch (error) {
    console.error("Error updating slide: ", error);
    throw new Error("Could not update slide.");
  }
}

// Delete a slide
export async function deleteSlide(id: string) {
  try {
    const docRef = doc(db, 'slideshow', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting slide: ", error);
    throw new Error("Could not delete slide.");
  }
}

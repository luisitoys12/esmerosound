'use server';

import {
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { SiteSettings } from '@/types';

const isFirebaseConfigured = process.env.NEXT_PUBLIC_FIREBASE_API_KEY && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

const settingsDocRef = doc(db, 'config', 'main');

const defaultSettings: SiteSettings = {
  title: "Esmerosound",
  description: "Radio online con la mejor programación.",
  facebookUrl: "https://facebook.com",
  instagramUrl: "https://instagram.com",
  twitterUrl: "https://twitter.com",
  streamingSource: "azuracast",
};

// Get site settings
export async function getSettings(): Promise<SiteSettings> {
  if (!isFirebaseConfigured) {
    console.warn("Firebase config is missing, returning default settings.");
    return defaultSettings;
  }
  
  try {
    const docSnap = await getDoc(settingsDocRef);

    if (docSnap.exists()) {
      return docSnap.data() as SiteSettings;
    } else {
      // Seed the database with default settings if it's empty
      console.log("Settings document does not exist. Seeding with default data...");
      await setDoc(settingsDocRef, defaultSettings);
      return defaultSettings;
    }
  } catch (error) {
    console.error("Error getting settings, returning default data. This is likely due to missing Firebase credentials or a disabled API.", error);
    return defaultSettings;
  }
}

// Update site settings
export async function updateSettings(settingsData: Partial<SiteSettings>) {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured. Cannot update settings.");
  }
  try {
    // Using set with merge:true will create the document if it doesn't exist,
    // and update it if it does.
    await setDoc(settingsDocRef, settingsData, { merge: true });
  } catch (error) {
    console.error("Error updating settings: ", error);
    throw new Error("Could not update settings.");
  }
}

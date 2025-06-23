'use server';

import {
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import type { SiteSettings } from '@/types';

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
  if (!isFirebaseConfigured || !db) {
    console.warn("Firebase config is missing, returning default settings.");
    return defaultSettings;
  }
  
  const settingsDocRef = doc(db, 'config', 'main');
  try {
    const docSnap = await getDoc(settingsDocRef);

    if (docSnap.exists()) {
      return { ...defaultSettings, ...docSnap.data() } as SiteSettings;
    } else {
      console.log("Settings document does not exist. Returning default settings.");
      return defaultSettings;
    }
  } catch (error) {
    console.error("Error getting settings, returning default data. This is likely due to missing Firebase credentials or a disabled API.", error);
    return defaultSettings;
  }
}

// Update site settings
export async function updateSettings(settingsData: Partial<SiteSettings>) {
  if (!isFirebaseConfigured || !db) {
    throw new Error("Firebase is not configured. Cannot update settings.");
  }
  const settingsDocRef = doc(db, 'config', 'main');
  try {
    await setDoc(settingsDocRef, settingsData, { merge: true });
  } catch (error) {
    console.error("Error updating settings: ", error);
    throw new Error("Could not update settings.");
  }
}

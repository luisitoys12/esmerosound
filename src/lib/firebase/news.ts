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
import type { NewsArticle } from '@/types';
import { newsArticles as seedData } from '@/lib/news-data';

const isFirebaseConfigured = process.env.NEXT_PUBLIC_FIREBASE_API_KEY && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

const newsCollection = collection(db, 'news');

export type NewsArticleData = Omit<NewsArticle, 'id' | 'createdAt' | 'date'>;

// Add a new news article
export async function addNewsArticle(articleData: NewsArticleData) {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured. Cannot add article.");
  }
  try {
    const docRef = await addDoc(newsCollection, {
      ...articleData,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id };
  } catch (error) {
    console.error("Error adding news article: ", error);
    throw new Error("Could not add news article.");
  }
}

// Get all news articles, sorted by creation date
export async function getNewsArticles(articleLimit: number = 20): Promise<NewsArticle[]> {
  if (!isFirebaseConfigured) {
    console.warn("Firebase config is missing, returning seed news data.");
    return seedData.map(article => ({ ...article, createdAt: new Date().getTime() })).slice(0, articleLimit);
  }
  try {
    const q = query(newsCollection, orderBy('createdAt', 'desc'), limit(articleLimit));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      // Seed the database with example articles if it's empty
      console.log("News collection is empty. Seeding with example data...");
      for (const article of seedData) {
        const { id, date, createdAt, ...articleData } = article;
        await addDoc(newsCollection, {
          ...articleData,
          date: new Date().toISOString().split('T')[0],
          createdAt: serverTimestamp(),
        });
      }
      // Re-fetch after seeding
      const newSnapshot = await getDocs(q);
      if (newSnapshot.empty) {
        return seedData.map(article => ({ ...article, createdAt: new Date().getTime() })).slice(0, articleLimit);
      }
      return newSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toMillis() || new Date().getTime(),
        } as NewsArticle;
      });
    }

    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toMillis() || new Date().getTime(),
      } as NewsArticle;
    });
  } catch (error) {
    console.error("Error getting news articles, returning seed data. This is likely due to missing Firebase credentials or a disabled API.", error);
    return seedData.map(article => ({ ...article, createdAt: new Date().getTime() })).slice(0, articleLimit);
  }
}

// Get a single news article by ID
export async function getNewsArticleById(id: string): Promise<NewsArticle | null> {
  if (!isFirebaseConfigured) {
    console.warn("Firebase config is missing, returning seed news data for ID:", id);
    const seedArticle = seedData.find(article => article.id === id);
    return seedArticle ? { ...seedArticle, createdAt: new Date().getTime() } : null;
  }
  try {
    const docRef = doc(db, 'news', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toMillis() || new Date().getTime(),
      } as NewsArticle;
    } else {
      const seedArticle = seedData.find(article => article.id === id);
      if (seedArticle) {
        return { ...seedArticle, createdAt: new Date().getTime() };
      }
      return null;
    }
  } catch (error) {
    console.error("Error getting news article by ID, returning seed data. This is likely due to missing Firebase credentials or a disabled API.", error);
    const seedArticle = seedData.find(article => article.id === id);
    if (seedArticle) {
      return { ...seedArticle, createdAt: new Date().getTime() };
    }
    return null;
  }
}

// Update a news article
export async function updateNewsArticle(id: string, articleData: Partial<NewsArticleData>) {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured. Cannot update article.");
  }
  try {
    const docRef = doc(db, 'news', id);
    await updateDoc(docRef, articleData);
  } catch (error) {
    console.error("Error updating news article: ", error);
    throw new Error("Could not update news article.");
  }
}

// Delete a news article
export async function deleteNewsArticle(id: string) {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured. Cannot delete article.");
  }
  try {
    const docRef = doc(db, 'news', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting news article: ", error);
    throw new Error("Could not delete news article.");
  }
}

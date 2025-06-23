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

export async function getNewsArticles(articleLimit: number = 20): Promise<NewsArticle[]> {
  const getSeedData = () => seedData.map(article => ({ ...article, createdAt: new Date().getTime() })).slice(0, articleLimit);
  
  if (!isFirebaseConfigured) {
    console.warn("Firebase config is missing, returning seed news data.");
    return getSeedData();
  }

  try {
    const q = query(newsCollection, orderBy('createdAt', 'desc'), limit(articleLimit));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log("News collection is empty. Returning seed data as a fallback.");
      return getSeedData();
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
    return getSeedData();
  }
}

export async function getNewsArticleById(id: string): Promise<NewsArticle | null> {
  const getSeedArticle = () => {
    const seedArticle = seedData.find(article => article.id === id);
    return seedArticle ? { ...seedArticle, createdAt: new Date().getTime() } : null;
  }
  
  if (!isFirebaseConfigured) {
    console.warn("Firebase config is missing, returning seed news data for ID:", id);
    return getSeedArticle();
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
      // If not in Firebase, check seed data.
      return getSeedArticle();
    }
  } catch (error) {
    console.error("Error getting news article by ID, returning seed data. This is likely due to missing Firebase credentials or a disabled API.", error);
    return getSeedArticle();
  }
}

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

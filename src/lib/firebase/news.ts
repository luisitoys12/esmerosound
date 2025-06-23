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

const newsCollection = collection(db, 'news');

export type NewsArticleData = Omit<NewsArticle, 'id' | 'createdAt' | 'date'>;

// Add a new news article
export async function addNewsArticle(articleData: NewsArticleData) {
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
  try {
    const q = query(newsCollection, orderBy('createdAt', 'desc'), limit(articleLimit));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return [];
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
    console.error("Error getting news articles: ", error);
    return [];
  }
}

// Get a single news article by ID
export async function getNewsArticleById(id: string): Promise<NewsArticle | null> {
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
      return null;
    }
  } catch (error) {
    console.error("Error getting news article by ID: ", error);
    return null;
  }
}

// Update a news article
export async function updateNewsArticle(id: string, articleData: Partial<NewsArticleData>) {
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
  try {
    const docRef = doc(db, 'news', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting news article: ", error);
    throw new Error("Could not delete news article.");
  }
}

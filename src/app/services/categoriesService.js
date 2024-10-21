import { collection } from 'firebase/firestore';
import { db } from '@/app/config/firebaseConfig';
import { fetchDocuments } from '@/app/utils/firebaseUtils';

const dbRefCategories = collection(db, 'categories');

export async function fetchCategoriesList() {
  return await fetchDocuments(dbRefCategories);
}

import { collection, query, where, limit } from 'firebase/firestore';
import { db } from '@/app/config/firebaseConfig';
import { fetchDocuments } from '@/app/utils/firebaseUtils';

const dbRefBrands = collection(db, 'producers');

export async function fetchBrands(limitCount = null) {
  const q = limitCount
    ? query(collection(db, 'producers'), limit(limitCount))
    : collection(db, 'producers');
  return await fetchDocuments(q);
}

export async function fetchBrandById(id) {
  const q = query(dbRefBrands, where('id', '==', id));
  const brands = await fetchDocuments(q);
  return brands.length ? brands[0] : null;
}

import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/app/config/firebaseConfig';
import { fetchDocuments } from '@/app/utils/firebaseUtils';

const dbRefVisitors = collection(db, 'shopping_ua_visitors');

export async function fetchVisitorsCount() {
  try {
    const q = query(dbRefVisitors);
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error('Error getting document count:', error);
    return null;
  }
}

export async function addVisitorId(id) {
  const dataDoc = {
    ip_hash: id,
    date: Timestamp.fromDate(new Date())
  };
  try {
    await addDoc(collection(db, 'shopping_ua_visitors'), dataDoc);
  } catch (e) {
    console.error('Error adding id visitors: ', e);
  }
}

export async function fetchVisitorByIpHash(id) {
  const q = query(dbRefVisitors, where('ip_hash', '==', id));
  return await fetchDocuments(q);
}

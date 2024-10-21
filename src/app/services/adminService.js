import { collection, Timestamp, addDoc } from 'firebase/firestore';
import { db } from '@/app/config/firebaseConfig';

const dbRefGoods = collection(db, 'goods');

export async function addProduct(data) {
  const dataDoc = {
    ...data,
    date: Timestamp.fromDate(new Date())
  };
  try {
    await addDoc(dbRefGoods, dataDoc);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

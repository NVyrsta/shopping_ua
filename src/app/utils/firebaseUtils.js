import { getDocs } from 'firebase/firestore';

export async function fetchDocuments(query, singleDocument = false) {
  try {
    const querySnapshot = await getDocs(query);

    if (!querySnapshot.empty) {
      const docs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return singleDocument ? docs[0] : docs;
    } else {
      return singleDocument ? null : [];
    }
  } catch (error) {
    console.error('Error fetching documents:', error);
    return singleDocument ? null : [];
  }
}

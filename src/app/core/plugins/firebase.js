import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  query,
  where,
  updateDoc,
  Timestamp,
  limit
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const dbRefGoods = collection(db, 'goods');
const dbRefBrands = collection(db, 'producers');
const dbRefVisitors = collection(db, 'shopping_ua_visitors');
export async function fetchProducts() {
  try {
    const querySnapshot = await getDocs(collection(db, 'goods'));

    const products = [];

    querySnapshot.forEach(doc => {
      products.push({ id: doc.id, ...doc.data() });
    });

    return products;
  } catch (error) {
    console.error('Error fetching products', error);
  }
}

export async function fetchCategoriesList() {
  try {
    const querySnapshot = await getDocs(collection(db, 'categories'));

    const categories = [];

    querySnapshot.forEach(doc => {
      categories.push({ id: doc.id, ...doc.data() });
    });

    return categories;
  } catch (error) {
    console.error('Error fetching products', error);
  }
}

export async function addProduct(data) {
  const dataDoc = {
    ...data,
    date: Timestamp.fromDate(new Date())
  };
  try {
    await addDoc(collection(db, 'goods'), dataDoc);
  } catch (e) {
    console.error('Error adding document: ', e);
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
  try {
    const q = query(dbRefVisitors, where('ip_hash', '==', id));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];

      return { id: doc.id, ...doc.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting document:', error);
    return null;
  }
}

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

export async function updateProduct(product) {
  try {
    const productRef = doc(db, 'goods', product.id);

    await updateDoc(productRef, product);
  } catch (error) {
    console.error('Error updating product:', error);
  }
}

export async function fetchProductById(id) {
  try {
    const q = query(dbRefGoods, where('id', '==', id));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];

      return { id: doc.id, ...doc.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting document:', error);
    return null;
  }
}

export async function fetchProductsByIds(ids) {
  try {
    const q = query(dbRefGoods, where('id', 'in', ids));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return products;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error getting documents:', error);
    return [];
  }
}

export async function fetchFavoritesProducts() {
  const ids = JSON.parse(localStorage.getItem('favorites') || '[]');

  if (ids.length === 0) {
    return [];
  }

  try {
    const q = query(dbRefGoods, where('id', 'in', ids));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docs = [];

      querySnapshot.forEach(doc => {
        docs.push({ id: doc.id, ...doc.data() });
      });

      return docs;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
}

export async function fetchProductByQuery(queryString) {
  try {
    const q = query(dbRefGoods);

    const querySnapshot = await getDocs(q);

    const filteredProducts = querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(product => {
        return Object.values(product.name).some(name =>
          name.toLowerCase().includes(queryString.toLowerCase())
        );
      });

    return filteredProducts;
  } catch (error) {
    console.error('Error getting documents:', error);
    return [];
  }
}

export async function fetchProductsByCategories(categories) {
  try {
    const q = query(
      dbRefGoods,
      where('categories', 'array-contains', categories)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return products;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error getting documents:', error);
    return [];
  }
}

export async function fetchProductsByBrand(brandID) {
  try {
    const q = query(dbRefGoods, where('producer_id', '==', brandID));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return products;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error getting products:', error);
    return [];
  }
}

export async function fetchNewProductsByCategory(category) {
  try {
    const currentDate = new Date();
    const twoWeeksAgo = new Date(
      currentDate.setDate(currentDate.getDate() - 14)
    );

    const timestamp = Timestamp.fromDate(twoWeeksAgo);

    const q = query(
      dbRefGoods,
      where('categories', 'array-contains', category),
      where('date', '>', timestamp)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return products;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error getting documents:', error);
    return [];
  }
}

export async function fetchSaledProductsByCategory(category) {
  try {
    const q = query(
      dbRefGoods,
      where('categories', 'array-contains', category),
      where('isDiscounted', '==', true)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return products;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error getting documents:', error);
    return [];
  }
}

// --- Brands ---

export async function fetchBrands(limitCount = null) {
  try {
    let q;

    if (limitCount) {
      q = query(collection(db, 'producers'), limit(limitCount));
    } else {
      q = query(collection(db, 'producers'));
    }

    const querySnapshot = await getDocs(q);

    const brands = [];

    querySnapshot.forEach(doc => {
      brands.push({ id: doc.id, ...doc.data() });
    });

    return brands;
  } catch (error) {
    console.error('Error fetching brands', error);
  }
}

export async function fetchBrandById(id) {
  try {
    const q = query(dbRefBrands, where('id', '==', id));

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];

      return { id: doc.id, ...doc.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting document:', error);
    return null;
  }
}

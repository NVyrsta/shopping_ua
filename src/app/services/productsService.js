import {
  collection,
  getDocs,
  query,
  where,
  limit,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/app/config/firebaseConfig';
import { fetchDocuments } from '@/app/utils/firebaseUtils';

const dbRefGoods = collection(db, 'goods');

export async function fetchProducts() {
  return await fetchDocuments(dbRefGoods);
}

export async function fetchProductById(id) {
  const q = query(dbRefGoods, where('id', '==', id));

  return await fetchDocuments(q, true);
}

export async function fetchProductsByIds(ids) {
  const q = query(dbRefGoods, where('id', 'in', ids));
  return await fetchDocuments(q);
}

export async function fetchFavoritesProducts() {
  const ids = JSON.parse(localStorage.getItem('favorites') || '[]');

  if (ids.length === 0) {
    return [];
  }

  const q = query(dbRefGoods, where('id', 'in', ids));

  return await fetchDocuments(q);
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

export async function fetchSaledProductsByCategory(
  category,
  limitCount = null
) {
  const q = query(
    dbRefGoods,
    where('categories', 'array-contains', category),
    where('isDiscounted', '==', true),
    ...(limitCount ? [limit(limitCount)] : [])
  );

  return await fetchDocuments(q);
}

export async function fetchNewProductsByCategory(category, limitCount = null) {
  const currentDate = new Date();
  const twoWeeksAgo = new Date(currentDate.setDate(currentDate.getDate() - 14));
  const timestamp = Timestamp.fromDate(twoWeeksAgo);

  const q = query(
    dbRefGoods,
    where('categories', 'array-contains', category),
    where('date', '>', timestamp),
    ...(limitCount ? [limit(limitCount)] : [])
  );

  return await fetchDocuments(q);
}

export async function fetchProductsByCategories(categories, gender) {
  try {
    const q = query(
      dbRefGoods,
      where('categories', 'array-contains', categories)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      let products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      products = products.filter(product =>
        product.categories.includes(gender)
      );

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
  const q = query(dbRefGoods, where('producer_id', '==', brandID));
  return await fetchDocuments(q);
}

export async function fetchByCategory(category, gender, limitCount = null) {
  try {
    const q = query(
      dbRefGoods,
      where('categories', 'array-contains', category)
    );

    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      let products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      products = products.filter(product =>
        product.categories.includes(gender)
      );

      if (limitCount) {
        products = products.slice(0, limitCount);
      }

      return products;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error getting documents:', error);
    return [];
  }
}

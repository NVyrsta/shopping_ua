// firebase.js
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
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAn6bWaWHE7nUxriO5K9BNjmazOa-9Svrw',
  authDomain: 'products-cataloge.firebaseapp.com',
  projectId: 'products-cataloge',
  storageBucket: 'products-cataloge.appspot.com',
  messagingSenderId: '35426212855',
  appId: '1:35426212855:web:5e70a934d03d1da6736cf2',
  measurementId: 'G-9GSYH92P8M',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const dbRef = collection(db, 'goods');

export async function fetchProducts() {
  const querySnapshot = await getDocs(collection(db, 'goods'));

  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
}

export async function addProduct(
  name,
  img,
  price,
  quantity,
  category,
  producer,
) {
  try {
    const id = uuidv4();
    const date = new Date();

    const docRef = await addDoc(collection(db, 'goods'), {
      name, // `name` is now an object containing multiple translations
      price,
      quantity,
      id,
      date,
      img,
      category,
      producer,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

export async function updateProduct(product) {
  try {
    const productRef = doc(db, 'goods', product.id); // Reference to the specific product document

    await updateDoc(productRef, product); // Update the document with the new product data

    console.log('Document updated with ID: ', product.id);
  } catch (error) {
    console.error('Error updating product:', error);
  }
}

export async function fetchProductById(id) {
  try {
    // Create a query against the "goods" collection
    const q = query(dbRef, where('id', '==', id));

    // Execute the query
    const querySnapshot = await getDocs(q);

    // Check if the query returned any documents
    if (!querySnapshot.empty) {
      // Extract the first matching document
      const doc = querySnapshot.docs[0];
      console.log('doc', doc.data());

      return { id: doc.id, ...doc.data() };
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error getting document:', error);
    return null;
  }
}

export async function fetchProductsByIds(ids) {
  try {
    // Create a query to find products where the 'id' field matches any of the ids in the array
    const q = query(dbRef, where('id', 'in', ids));

    // Execute the query
    const querySnapshot = await getDocs(q);

    // Check if the query returned any documents
    if (!querySnapshot.empty) {
      // Map over the returned documents and extract the data
      const products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log('Products fetchProductsByIds:', products);
      return products;
    } else {
      console.log('No matching documents!');
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
    // Якщо масив порожній, повертаємо порожній масив
    console.log('No favorite IDs found');
    return [];
  }

  try {
    // Створити запит до колекції "goods" з умовою наявності ідентифікаторів у "ids"
    const q = query(dbRef, where('id', 'in', ids));

    // Виконати запит
    const querySnapshot = await getDocs(q);

    // Перевірити, чи повернув запит які-небудь документи
    if (!querySnapshot.empty) {
      // Створити масив для збереження знайдених документів
      const docs = [];

      // Пройтись по всім документам і додати їх до масиву
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });

      return docs;
    } else {
      console.log('No documents found!');
      return [];
    }
  } catch (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
}

export async function fetchProductByQuery(queryString) {
  try {
    // Create a query against the "goods" collection
    const q = query(dbRef);

    // Execute the query
    const querySnapshot = await getDocs(q);

    // Filter the documents based on the query string
    const filteredProducts = querySnapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() }))
      .filter((product) => {
        // Check if the query string is in any of the name fields
        return Object.values(product.name).some((name) =>
          name.toLowerCase().includes(queryString.toLowerCase()),
        );
      });

    // Log the filtered products

    return filteredProducts;
  } catch (error) {
    console.error('Error getting documents:', error);
    return [];
  }
}

<template>
  <div>
    <h1>Add New Product</h1>
    <form @submit.prevent="submitForm">
      <label for="name-uk">Name (Ukrainian):</label>
      <input 
        id="name-uk" 
        v-model="productName.uk"
        type="text" 
        required 
      />
      <br />

      <label for="name-en">Name (English):</label>

      <input 
        id="name-en"
        v-model="productName.en" 
        type="text"
        required 
      />
      <br />

      <label for="img">IMG:</label>

      <input 
        id="img"
        v-model="productImg"
        type="text"
        required 
      />
      <br />

      <label for="price">Price:</label>
      <input 
        id="price" 
        v-model.number="productPrice" 
        type="number" 
        step="0.01" 
        required 
      />
      <br />

      <label for="quantity">Quantity:</label>
      <input 
        id="quantity" 
        v-model.number="productQuantity" 
        type="number" 
        required 
      />
      <br />

      <label for="category-uk">Category (Ukrainian):</label>
      <input 
        id="category-uk" 
        v-model="productCategory.uk" 
        type="text" 
        required 
      />
      <br />

      <label for="category-en">Category (English):</label>
      <input 
        id="category-en" 
        v-model="productCategory.en" 
        type="text" 
        required 
      />
      <br />

      <label for="producer">Producer:</label>
      <input 
        id="producer"
        v-model="productProducer.en" 
        type="text" 
        required 
      />
      <br />

      <button type="submit">
        {{ isEditing ? 'Update Product' : 'Add Product' }}
      </button>
      <br />
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { addProduct } from '@/app/core/plugins/firebase';

const productName = ref({
  uk: '',
  en: '',
});

const productCategory = ref({
  uk: '',
  en: '',
});

const productImg = ref('');
const productProducer = ref('');
const productPrice = ref(0);
const productQuantity = ref(0);

const submitForm = async () => {
  try {
    // Pass the productName object to the addProduct function
    await addProduct(
      productName.value,
      productImg.value,
      productPrice.value,
      productQuantity.value,
      productCategory.value,
      productProducer.value,
    );
    // Clear the form fields after submission
    productName.value = { uk: '', en: '' };
    productCategory.value = { uk: '', en: '' };
    productImg.value = '';
    productProducer.value = '';
    productPrice.value = 0;
    productQuantity.value = 0;
  } catch (error) {
    console.error('Error adding product: ', error);
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>

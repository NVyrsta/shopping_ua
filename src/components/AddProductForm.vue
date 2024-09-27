<template>
  <div class="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
    <h1 class="text-2xl font-bold mb-6 text-gray-800">
      {{ isEditing ? 'Update Product' : 'Add New Product' }}
    </h1>

    <form
      @submit.prevent="submitForm" 
      class="space-y-4"
    >
      <div>
        <label 
          for="name-uk" 
          class="block text-sm font-medium text-gray-700"
        >
          Name (Ukrainian):
        </label>

        <input 
          id="name-uk" 
          v-model="productName.uk"
          type="text" 
          required 
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label 
          for="name-en" 
          class="block text-sm font-medium text-gray-700"
        >
          Name (English):
        </label>

        <input 
          id="name-en"
          v-model="productName.en" 
          type="text"
          required 
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label 
          for="img" 
          class="block text-sm font-medium text-gray-700"
        >
          IMG:
        </label>
        
        <input 
          id="img"
          v-model="productImg"
          type="text"
          required 
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label 
          for="price" 
          class="block text-sm font-medium text-gray-700"
        >
          Price:
        </label>

        <input 
          id="price" 
          v-model.number="productPrice" 
          type="number" 
          step="0.01" 
          required 
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label 
          for="quantity" 
          class="block text-sm font-medium text-gray-700"
        >
          Quantity:
        </label>
        <input 
          id="quantity" 
          v-model.number="productQuantity" 
          type="number" 
          required 
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label 
          for="category-uk" 
          class="block text-sm font-medium text-gray-700"
        >
          Category (Ukrainian):
        </label>

        <input 
          id="category-uk" 
          v-model="productCategory.uk" 
          type="text" 
          required 
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label 
          for="category-en" 
          class="block text-sm font-medium text-gray-700"
        >
          Category (English):
        </label>

        <input 
          id="category-en" 
          v-model="productCategory.en" 
          type="text" 
          required 
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label 
          for="producer" 
          class="block text-sm font-medium text-gray-700"
        >
          Producer:
        </label>

        <input 
          id="producer"
          v-model="productProducer.en" 
          type="text" 
          required 
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <button 
          type="submit" 
          class="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {{ isEditing ? 'Update Product' : 'Add Product' }}
        </button>
      </div>
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

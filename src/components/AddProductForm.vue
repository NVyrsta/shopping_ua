<template>
  <div class="mx-auto max-w-4xl p-6">
    <div class="w-full rounded-lg bg-white p-6 shadow-lg">
      <h1 class="mb-6 text-center text-3xl font-bold text-gray-600">
        {{ isEditing ? 'Update Product' : 'Product Addition Form' }}
      </h1>

      <!-- Форма -->
      <form
        @submit.prevent="submitForm"
        class="grid grid-cols-1 gap-6 lg:grid-cols-2"
      >
        <!-- Product ID -->
        <div>
          <label
            for="id"
            class="block text-sm font-medium text-gray-700"
          >
            ID:
          </label>
          <input
            id="id"
            v-model="productId"
            type="text"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
        </div>

        <!-- Date (Timestamp) -->
        <div>
          <label
            for="date"
            class="block text-sm font-medium text-gray-700"
          >
            Date:
          </label>
          <input
            id="date"
            v-model="productDate"
            type="date"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
        </div>

        <!-- Product Name (Ukrainian) -->
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
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
        </div>

        <!-- Product Name (English) -->
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
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
        </div>

        <!-- Product IMG URLs -->
        <div class="lg:col-span-2">
          <label
            for="img"
            class="block text-sm font-medium text-gray-700"
          >
            Images:
          </label>
          <div
            v-for="(img, index) in productImages"
            :key="index"
            class="mt-1 flex items-center space-x-2"
          >
            <input
              v-model="productImages[index]"
              type="text"
              class="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
            <button
              type="button"
              @click="removeImage(index)"
              class="text-red-500"
            >
              Remove
            </button>
          </div>
          <button
            type="button"
            @click="addImage"
            class="mt-2 text-blue-500"
          >
            + Add Image
          </button>
        </div>

        <!-- Product Price -->
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
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
        </div>

        <!-- Product Price NEW -->
        <div>
          <label
            for="price-new"
            class="block text-sm font-medium text-gray-700"
          >
            Price NEW:
          </label>
          <input
            id="price-new"
            v-model.number="productPriceNew"
            type="number"
            step="0.01"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
        </div>

        <!-- Categories -->
        <div class="lg:col-span-2">
          <label class="mb-2 block text-sm font-medium text-gray-700">
            Select a category:
          </label>
          <div class="flex flex-wrap gap-2">
            <div
              v-for="category in categoriesCatalog"
              :key="category.id"
              class="inline-flex cursor-pointer items-center rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-300"
              @click="addCategory(category)"
            >
              <span v-html="$t('Breadcrumbs.' + category.id)" />
            </div>
          </div>

          <div
            v-if="productCategories.length > 0"
            class="mt-4"
          >
            <label class="mb-2 block text-sm font-medium text-gray-700">
              Selected categories:
            </label>
            <div class="flex flex-wrap gap-2">
              <div
                v-for="(category, index) in productCategories"
                :key="index"
                class="inline-flex items-center rounded-full bg-green-200 px-3 py-1 text-sm font-medium text-green-700"
              >
                <span v-html="$t('Breadcrumbs.' + category)" />
                <button
                  type="button"
                  @click="removeCategory(index)"
                  class="ml-2 text-green-700 hover:text-red-500"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Product Producer ID -->
        <div>
          <label
            for="producer-id"
            class="block text-sm font-medium text-gray-700"
          >
            Producer ID:
          </label>
          <input
            id="producer-id"
            v-model="productProducerId"
            type="text"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
        </div>

        <!-- Product Producer -->
        <div>
          <label
            for="producer"
            class="block text-sm font-medium text-gray-700"
          >
            Producer:
          </label>
          <input
            id="producer"
            v-model="productProducer"
            type="text"
            class="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
        </div>

        <!-- Submit Button -->
        <div class="lg:col-span-2">
          <button
            type="submit"
            :disabled="!isFormValid"
            class="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {{ isEditing ? 'Update Product' : 'Add Product' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue';
  import { addProduct, fetchCategoriesList } from '@/app/core/plugins/firebase';

  const categoriesCatalog = ref([]);

  // Form fields
  const productId = ref('');
  const productProducer = ref('');
  const productProducerId = ref('');
  const productName = ref({ uk: '', en: '' });
  const productCategories = ref([]);
  const productImages = ref([]);
  const productPrice = ref(0);
  const productPriceNew = ref(0);
  const productDate = ref(new Date().toISOString().substr(0, 10));

  // Functions for dynamic fields (images and categories)
  const addImage = () => productImages.value.push('');
  const removeImage = index => productImages.value.splice(index, 1);

  const addCategory = category => {
    if (!productCategories.value.includes(category.id)) {
      productCategories.value.push(category.id);
    }
  };

  const removeCategory = index => {
    productCategories.value.splice(index, 1);
  };

  // Submit form
  const submitForm = async () => {
    const productStock = [
      { amount: 2, size: 'xl' },
      { amount: 3, size: 'l' },
      { amount: 5, size: 'm' }
    ];
    const isDiscounted = productPriceNew.value < productPrice.value;
    const docData = {
      id: productId.value,
      producer: productProducer.value,
      producer_id: productProducerId.value,
      stock: productStock,
      price: productPrice.value,
      price_new: productPriceNew.value,
      images: productImages.value,
      categories: productCategories.value,
      name: productName.value,
      isDiscounted
    };

    try {
      await addProduct(docData);

      // Reset form
      productName.value = { uk: '', en: '' };
      productId.value = '';
      productImages.value = [];
      productCategories.value = [];
      productProducer.value = '';
      productProducerId.value = '';
      productPrice.value = 0;
      productPriceNew.value = 0;
      productDate.value = new Date().toISOString().substr(0, 10);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const isFormValid = computed(() => {
    return (
      productId.value.trim() !== '' &&
      productProducer.value.trim() !== '' &&
      productProducerId.value.trim() !== '' &&
      productName.value.uk.trim() !== '' &&
      productName.value.en.trim() !== '' &&
      productCategories.value.length > 0 &&
      productImages.value.length > 0 &&
      productPrice.value > 0 &&
      productPriceNew.value >= 0
    );
  });

  onMounted(async () => {
    categoriesCatalog.value = await fetchCategoriesList();
  });
</script>

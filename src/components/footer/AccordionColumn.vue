<template>
  <div class="accordion-item">
    <!-- Заголовок -->
    <h2
      class="text-lg cursor-pointer md:cursor-default md:mb-2 text-gray-500 text-[16px]"
      @click="toggle"
    >
      {{ props.title }}
    </h2>
    
    <!-- Список лінків -->
    <ul :class="['transition-all', { 'hidden': !isOpen, 'md:block': true }]">
      <li 
        v-for="(link, index) in links" 
        :key="index" 
        class="mb-2"
      >
        <router-link 
          :to="link.path" 
          class="block py-2 text-[16px] text-gray-500 hover:text-black active:text-red-600"
          active-class="text-red-600"
        >
          {{ link.label }}
        </router-link>
      </li>
    </ul>
  </div>
</template>


<script setup>
import { ref } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },

  links: {
    type: Array,
    required: true,
  },
});  

const isOpen = ref(false); // Відстежує стан відкриття акордеону

const toggle = () => {
  isOpen.value = !isOpen.value; // Перемикає стан відкриття
};
</script>

<template>
  <div class="accordion-item">
    <h2
      class="cursor-pointer md:cursor-default md:mb-2 text-gray-500 text-[16px]"
      @click="toggle"
    >
      {{ props.title }}
    </h2>
    
    <ul :class="['transition-all', { 'hidden': !isOpen, 'md:block': true }]">
      <li 
        v-for="(link, index) in links" 
        :key="index" 
        class="mb-2"
      >
        <router-link 
          :to="link.path" 
          class="block text-sm text-gray-500 hover:text-black active:text-red-600"
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

const isOpen = ref(false);

const toggle = () => {
  isOpen.value = !isOpen.value;
};
</script>

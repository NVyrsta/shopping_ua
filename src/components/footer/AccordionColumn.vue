<template>
  <div class="accordion-item">
    <h2
      class="flex justify-between items-center gap-4 cursor-pointer md:cursor-default mb-2 md:mb-4 text-gray-500 text-[16px]"
      @click="toggle"
    >
      {{ props.title }}

      <SvgIcon 
        id="accordion-arrow"
        width="7"
        height="4"
        class="flex-shrink-0 transform rotate-180"
      />
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

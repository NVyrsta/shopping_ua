<template>
  <div class="accordion-item">
    <h2
      class="flex justify-between items-center gap-4 cursor-pointer md:cursor-default mb-2 md:mb-4 text-gray-500 text-[16px]"
      @click="toggle"
    >
      <span  class="block md:hidden" />

      <span>{{ props.title }}</span>

      <div
        class="block flex-shrink-0 md:hidden w-[16px] h-[16px]"
        :class="{'transform rotate-180 transition ease-in-out duration-300': isOpen}"
      >
        <SvgIcon 
          id="accordion-arrow"
          width="16"
          height="16"
        />
      </div>

    </h2>
    
    <ul 
      ref="menu"
      :class="[
        'transition-all duration-300 ease-in-out overflow-hidden md:max-h-[1000px] md:opacity-100', 
        { 'max-h-0 opacity-0': !isOpen, 'max-h-[1000px] opacity-100': isOpen }
      ]"
    >     
      <li 
        v-for="(link, index) in links" 
        :key="index" 
        class="mb-2"
      >
        <router-link 
          :to="link.path" 
          class="block text-sm text-gray-400 hover:text-black active:text-red-600"
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

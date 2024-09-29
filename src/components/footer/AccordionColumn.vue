<template>
  <div class="accordion-item">
    <h2
      class="mb-2 flex cursor-pointer items-center justify-between gap-4 text-[16px] text-gray-500 md:mb-4 md:cursor-default"
      @click="toggle"
    >
      <span class="block md:hidden" />

      <span>{{ props.title }}</span>

      <div
        class="block h-[16px] w-[16px] flex-shrink-0 md:hidden"
        :class="{
          'rotate-180 transform transition duration-300 ease-in-out': isOpen
        }"
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
        'overflow-hidden transition-all duration-300 ease-in-out md:max-h-[1000px] md:opacity-100',
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
      required: true
    },

    links: {
      type: Array,
      required: true
    }
  });

  const isOpen = ref(false);

  const toggle = () => {
    isOpen.value = !isOpen.value;
  };
</script>

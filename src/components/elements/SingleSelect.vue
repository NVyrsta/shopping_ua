<template>
  <div v-if="false">
    <div @click="isOpen = !isOpen">{{ value }}</div>
    <div v-if="isOpen">
      <div
        v-for="(option, index) in options"
        :key="index"
        @click="
          value = option;
          isOpen = false;
        "
      >
        <div class="flex items-center gap-2">
          {{ option }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
  import { ref } from 'vue';

  const value = ref('За зростанням ціни');

  const isOpen = ref(false);

  defineProps({
    options: {
      type: Array,
      required: true,
      default: () => []
    }
  });
</script>

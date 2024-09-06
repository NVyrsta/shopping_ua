<template>
  <svg
    :width="width"
    :height="height"
    :fill="fill"
    :viewBox="viewBox"
    role="img"
    aria-hidden="true"
  >
    <use :href="iconHref" />
  </svg>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  id: {
    type: String,
    required: true
  },

  width: {
    type: [String, Number],
    default: '16'
  },

  height: {
    type: [String, Number],
    default: '16'
  },

  fill: {
    type: String,
    default: 'currentColor',
    required: false
  }
});

const iconHref = computed(() => `/__spritemap#sprite-${props.id}`);
const viewBox = computed(() => `0 0 ${props.width} ${props.height}`);
</script>

<style scoped>
svg {
  display: block;
}
</style>

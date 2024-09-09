<template>
  <svg
    v-bind="svgAttributes"
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
    required: true,
  },

  width: {
    type: [String, Number],
    default: '16',
  },

  height: {
    type: [String, Number],
    default: '16',
  },

  fill: {
    type: String,
    default: 'none',
    required: false,
  },
});

const iconHref = computed(() => `/__spritemap#sprite-${props.id}`);

// Визначте атрибути для SVG лише якщо вони задані
const svgAttributes = computed(() => {
  const attrs = {};

  if (props.width) {
    attrs.width = props.width;
  }

  if (props.height) {
    attrs.height = props.height;
  }

  if (props.fill) {
    attrs.fill = props.fill;
  }

  return attrs;
});
</script>

<style scoped>
svg {
  display: block;
}
</style>

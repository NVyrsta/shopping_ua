<template>
  <button 
    @click="handleClick" 
    class="text-md text-white px-14 py-2 flex items-center justify-center space-x-2"
    :class="{ 
      'bg-green-500 hover:bg-green-700': green,
      'bg-red-500 hover:bg-red-700': red
    }"
  >
    <slot name="icon-left" />

    <span>{{ props.title }}</span>

    <slot name="icon-right" />
  </button>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: '',
  },

  green: {
    type: Boolean,
    default: false,
  },

  red: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['click']);

const handleClick = () => {
  emit('click');
};
</script>

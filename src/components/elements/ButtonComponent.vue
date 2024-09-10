<template>
  <button 
    @click="handleClick" 
    class="text-md text-white px-14 py-2 flex items-center justify-center space-x-2"
    :class="{ 
      'bg-green-500 hover:bg-green-700': green,
      'bg-red-500 hover:bg-red-700': red,
      'opacity-30 pointer-events-none': disabled
    }"
    :disabled="disabled"
  >
    <slot name="icon-left" />

    <span>{{ title }}</span>

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

  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['click']);

const handleClick = () => {
  if (!props.disabled) {
    emit('click');
  }
};
</script>

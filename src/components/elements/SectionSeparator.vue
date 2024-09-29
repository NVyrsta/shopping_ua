<template>
  <div class="flex items-center justify-start gap-3 px-4 mt-4">
    <div class="w-16 h-0.5 bg-black" />

    <span class="text-lg uppercase font-bold">{{ props.title }}</span>
  </div>
</template>

<script setup>
  const props = defineProps({
    title: {
      type: String,
      required: true
    }
  });
</script>

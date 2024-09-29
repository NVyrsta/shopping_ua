<template>
  <div class="mt-4 flex items-center justify-start gap-3 px-4">
    <div class="h-0.5 w-16 bg-black" />

    <span class="text-lg font-bold uppercase">{{ props.title }}</span>
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

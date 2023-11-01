<script setup lang="ts">
defineProps<{
  text: string;
}>()
</script>

<template>
  <button class="rounded-md px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium transition-colors hover:bg-gray-400">
    {{ text }}
  </button>
</template>

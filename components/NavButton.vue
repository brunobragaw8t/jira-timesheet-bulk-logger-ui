<script setup lang="ts">
defineProps<{
  to: string;
  text: string;
}>()
</script>

<template>
  <NuxtLink
    :to="to"
    class="rounded-md py-1 px-3 text-gray-400 text-sm font-medium transition-colors hover:text-gray-200"
    active-class="bg-gray-900 !text-gray-200"
  >
    {{ text }}
  </NuxtLink>
</template>

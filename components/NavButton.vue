<script setup lang="ts">
defineProps<{
  text: string;
  active: boolean;
}>()
</script>

<template>
  <button
    :class="[
      'rounded-md py-1 px-3 text-sm font-medium transition-colors hover:text-gray-200',
      {
        'text-gray-400': !active,
        'bg-gray-900': active,
      }
    ]"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  placeholder: string;
  options: any[];
}>()

const value = defineModel<string>()
</script>

<template>
  <div class="flex flex-col justify-center rounded-md border border-gray-800 p-4">
    <div v-if="!value" class="flex items-center gap-4">
      <Icon name="ph:wind-thin" size="2rem" />

      <span class="text-gray-400">{{ placeholder }}</span>

      <button class="inline-flex items-center gap-2 ml-auto rounded-md py-1 px-2 bg-gray-800 transition-colors hover:bg-gray-700">
        <Icon name="octicon:multi-select-16" />
        <span class="text-sm">Select</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  type: string;
  placeholder: string;
  instructions?: string;
}>()

const value = defineModel()
</script>

<template>
  <div>
    <label :for="$.uid.toString()" class="block mb-1 tracking-tight text-sm font-medium">
      {{ label }}
    </label>

    <input
      :id="$.uid.toString()"
      v-model="value"
      :type="type"
      :placeholder="placeholder"
      class="block w-full rounded-md border border-gray-800 px-3 py-1 text-sm bg-transparent text-gray-200 focus-visible:outline-none"
    >

    <div v-if="instructions" class="flex mt-1 text-gray-400 text-xs">
      <Icon
        name="material-symbols:info-outline-rounded"
        class="shrink-0 mr-1 h-4"
      />

      <span>{{ instructions }}</span>
    </div>
  </div>
</template>
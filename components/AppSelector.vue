<script setup lang="ts">
defineProps<{
  label: string;
  placeholder: string;
  options: any[];
}>()

const value = defineModel<string>()

const modalOpen = ref<boolean>(false)

const modalSearch = ref<string>('')
</script>

<template>
  <div>
    <div class="flex flex-col justify-center rounded-md border border-gray-800 p-4">
      <div v-if="!value" class="flex items-center gap-4">
        <Icon name="ph:wind-thin" size="2rem" />

        <span class="text-gray-400">{{ placeholder }}</span>

        <button class="inline-flex items-center gap-2 ml-auto rounded-md py-1 px-2 bg-gray-800 transition-colors hover:bg-gray-700">
          <Icon name="octicon:multi-select-16" />
          <span class="text-sm" @click="modalOpen = true">Select</span>
        </button>
      </div>
    </div>

    <div
      v-if="modalOpen"
      class="flex justify-center items-center fixed inset-0 z-10 p-4 bg-black bg-opacity-50"
    >
      <div class="rounded-md w-96 max-w-full bg-gray-900">
        <div class="flex items-center justify-between border-b border-gray-800 p-4">
          <span class="tracking-tight font-medium">{{ label }}</span>

          <button
            class="inline-flex text-gray-400 transition-colors hover:text-white"
            @click="modalOpen = false"
          >
            <Icon name="ic:sharp-close" />
          </button>
        </div>

        <div class="flex flex-col gap-4 p-4">
          <AppInput
            v-model="modalSearch"
            type="text"
            placeholder="Type your search here"
          />
        </div>
      </div>
    </div>
  </div>
</template>

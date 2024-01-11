<script setup lang="ts">
import slugify from 'slugify'
import type { AppSelectorOption } from '~/types/app-selector-option.type'

const props = defineProps<{
  label: string;
  placeholder: string;
  options: AppSelectorOption[];
}>()

const value = defineModel<string>()

const modalOpen = ref<boolean>(false)

const modalSearch = ref<string>('')

const filteredItems = computed(() => {
  if (!modalSearch) {
    return props.options
  }

  return props.options.filter((option) => {
    const optionLabel = slugify(option.label, { lower: true })
    const optionValue = slugify(option.value, { lower: true })
    const search = slugify(modalSearch.value, { lower: true })

    return optionLabel.includes(search) || optionValue.includes(search)
  })
})
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
      @click.self="modalOpen = false"
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

          <div
            class="rounded-md border border-gray-800 h-96 overflow-auto"
          >
            <p v-if="!filteredItems.length" class="py-2 px-3">
              No items found.
            </p>

            <template v-else>
              <button
                v-for="i in filteredItems"
                :key="i.value"
                class="flex gap-3 items-center border-b border-gray-800 py-2 px-3 w-full text-left transition-colors hover:bg-gray-700 last:border-b-0"
              >
                <span class="flex-shrink-0 w-14">
                  <img :src="i.icon" class="block w-6 mx-auto mb-1">
                  <span class="block text-center text-xs truncate">{{ i.value }}</span>
                </span>

                <span class="flex-grow-1 flex flex-col overflow-hidden">
                  <span
                    v-if="i.subLabel"
                    class="text-xs"
                  >
                    {{ i.subLabel }}
                  </span>

                  <span class="truncate">
                    {{ i.label }}
                  </span>
                </span>
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

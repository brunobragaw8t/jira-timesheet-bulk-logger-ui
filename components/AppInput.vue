<script setup lang="ts">
import slugify from 'slugify'
import type { AutocompleteItem } from '~/types/autocomplete-item.type'

const props = defineProps<{
  label: string;
  type: string;
  placeholder: string;
  instructions?: string;
  autocompleteItems?: AutocompleteItem[];
}>()

/**
 * State
 */

const value = defineModel<string>()

const displaySuggestions = ref<boolean>(false)

const suggestions = computed(() => {
  if (!props.autocompleteItems || !value.value || value.value.length < 3) {
    displaySuggestions.value = false
    return []
  }

  const query = value.value

  const results = props.autocompleteItems.filter((item) => {
    return slugify(item.label, { lower: true })
      .includes(slugify(query, { lower: true }))
  }).slice(0, 9)

  displaySuggestions.value = results.length > 0

  return results
})

/**
 * Actions
 */

function selectAutocomplete (index: number) {
  value.value = suggestions.value[index].value
  displaySuggestions.value = false
}

function handleShortcut (e: KeyboardEvent) {
  if (e.altKey && e.key >= '1' && e.key <= '9') {
    selectAutocomplete(Number(e.key) - 1)
  }
}

function closeSuggestions () {
  displaySuggestions.value = false
}

/**
 * Lifecycle
 */

onMounted(() => {
  document.addEventListener('click', closeSuggestions)
  document.addEventListener('keydown', handleShortcut)
})

onUnmounted(() => {
  document.removeEventListener('click', closeSuggestions)
  document.removeEventListener('keydown', handleShortcut)
})
</script>

<template>
  <div>
    <label :for="$.uid.toString()" class="block mb-1 tracking-tight text-sm font-medium">
      {{ label }}
    </label>

    <div class="relative">
      <input
        :id="$.uid.toString()"
        ref="input"
        v-model="value"
        :type="type"
        :placeholder="placeholder"
        class="block w-full rounded-md border border-gray-800 px-3 py-1 text-sm bg-transparent text-gray-200 focus-visible:outline-none"
        autocomplete="off"
        @input="displaySuggestions = true"
      >

      <div
        v-if="suggestions.length && displaySuggestions"
        class="absolute t-full l-0 rounded-md py-1 w-full bg-gray-800"
      >
        <div
          v-for="(match, i) in suggestions"
          :key="i"
          class="flex gap-2 items-start py-1 px-3 tracking-tight transition-colors hover:bg-gray-700 cursor-pointer"
          @click="selectAutocomplete(i)"
        >
          <span class="shrink-0 mt-1 w-4 rounded-sm bg-gray-600 text-xs text-center">{{ i + 1 }}</span>
          <span classs="text-sm">{{ match.label }}</span>
        </div>
      </div>
    </div>

    <div v-if="instructions" class="flex mt-1 text-gray-400 text-xs">
      <Icon
        name="material-symbols:info-outline-rounded"
        class="shrink-0 mr-1 h-4"
      />

      <span>{{ instructions }}</span>
    </div>
  </div>
</template>

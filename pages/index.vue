<script setup lang="ts">
/**
 * Config
 */

useHead({
  title: 'Jira Timesheet Bulk Logger UI'
})

const settings = useSettings()

/**
 * State
 */

const settingsApplied = computed(() => {
  return settings.data.value.cloudId && settings.data.value.email && settings.data.value.apiKey
})

const issueKey = ref('')

const issues = [
  {
    value: 'ABC-123',
    label: 'ABC-123 - Fix bug'
  },
  {
    value: 'ABC-456',
    label: 'ABC-456 - Add feature'
  },
  {
    value: 'ABC-789',
    label: 'ABC-789 - Fix new'
  }
]
</script>

<template>
  <div>
    <div v-if="!settingsApplied">
      <div class="p-4 mb-4 text-sm rounded-lg bg-gray-800 text-blue-400" role="alert">
        <span class="font-semibold">Heads up!</span>
        You need to configure your settings before you can use this app.
      </div>

      <AppButton
        text="Click here to go to settings"
        @click="navigateTo('/settings')"
      />
    </div>

    <template v-else>
      <AppInput
        v-model="issueKey"
        type="text"
        label="Issue key"
        placeholder="ABC-123"
        instructions="Enter the key for the issue you want to log time on"
        :autocomplete-items="issues"
      />
    </template>
  </div>
</template>

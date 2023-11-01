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

    <h1 v-else>
      Index
    </h1>
  </div>
</template>

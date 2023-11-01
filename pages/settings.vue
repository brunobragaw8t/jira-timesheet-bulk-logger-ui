<script setup lang="ts">
/**
 * Config
 */

useHead({
  title: 'Settings - Jira Timesheet Bulk Logger UI'
})

const settings = useSettings()

/**
 * State
 */

const displaySaved = ref(false)

/**
 * Actions
 */

function saveSettings () {
  settings.save()

  displaySaved.value = true

  setTimeout(() => {
    displaySaved.value = false
  }, 2000)
}
</script>

<template>
  <form @submit.prevent="saveSettings">
    <div class="flex gap-4">
      <AppInput
        v-model="settings.data.value.cloudId"
        class="flex-1"
        type="text"
        label="Cloud ID"
        placeholder="aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
        instructions="Your Atlassian cloud ID"
      />

      <AppInput
        v-model="settings.data.value.email"

        class="flex-1"
        type="text"
        label="Email"
        placeholder="name.surname@company.com"
        instructions="Email of your Atlassian account"
      />

      <AppInput
        v-model="settings.data.value.apiKey"
        class="flex-1"
        type="text"
        label="API key"
        placeholder="abcdefghijklmnopqrstuvwxyz1234567890"
        instructions="API token generated in your account security section"
      />
    </div>

    <div class="flex items-center gap-2 mt-6">
      <AppButton text="Save" />

      <div v-if="displaySaved" class="flex items-center gap-0.5">
        <Icon name="material-symbols:check-small-rounded" color="green" />
        <span class="tracking-tight text-sm font-medium">Saved!</span>
      </div>
    </div>
  </form>
</template>

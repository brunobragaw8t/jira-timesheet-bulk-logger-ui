<script setup lang="ts">
useHead({
  title: 'Settings - Jira Timesheet Bulk Logger UI'
})
</script>

<template>
  <div>
    <div class="flex gap-4">
      <AppInput
        class="flex-1"
        type="text"
        label="Cloud ID"
        placeholder="aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
        instructions="Your Atlassian cloud ID"
      />

      <AppInput
        class="flex-1"
        type="text"
        label="Email"
        placeholder="name.surname@company.com"
        instructions="Email of your Atlassian account"
      />

      <AppInput
        class="flex-1"
        type="text"
        label="API key"
        placeholder="abcdefghijklmnopqrstuvwxyz1234567890"
        instructions="API token generated in your account security section"
      />
    </div>

    <div>
      <button>Save</button>
    </div>
  </div>
</template>

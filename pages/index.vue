<script setup lang="ts">
import { type AppSelectorOption } from '~/types/app-selector-option.type'
import { type AutocompleteItem } from '~/types/autocomplete-item.type'

/**
 * Config
 */

useHead({
  title: 'Jira Timesheet Bulk Logger UI'
})

const settings = useSettings()
const projects = useProjects()
const issues = useIssues()

const projectsAutocomplete = computed<AutocompleteItem[]>(() => {
  return projects.items.value.map(project => ({
    value: project.key,
    label: `${project.key} - ${project.name}`
  }))
})

const projectsAsOptions = computed<AppSelectorOption[]>(() => {
  return projects.items.value.map<AppSelectorOption>(p => ({
    label: p.name,
    icon: p.avatarUrl,
    value: p.key
  }))
})

const issuesAutocomplete = computed<AutocompleteItem[]>(() => {
  return issues.data.value.map(issue => ({
    value: issue.key,
    label: issue.summary
  }))
})

/**
 * State
 */

const settingsApplied = computed(() => {
  return settings.data.value.cloudId && settings.data.value.email && settings.data.value.apiKey
})

const projectKey = ref<string>('')
const issueKey = ref<string>('')

/**
 * Actions
 */

function getIssues () {
  if (!projectKey.value) {
    return
  }

  useIssues().getIssues(projectKey.value)
}

let getIssuesTimer: NodeJS.Timeout

watch(projectKey, () => {
  clearTimeout(getIssuesTimer)

  getIssuesTimer = setTimeout(() => {
    getIssues()
  }, 300)
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

    <template v-else>
      <div class="flex gap-4">
        <AppSelector
          label="Project"
          placeholder="No project selected"
          class="flex-1"
          :options="projectsAsOptions"
        />

        <AppInput
          v-model="projectKey"
          type="text"
          label="Project key"
          placeholder="ABCD"
          instructions="Enter the key for the project you want to search issues in"
          :autocomplete-items="projectsAutocomplete"
          class="flex-1"
        />

        <AppInput
          v-model="issueKey"
          type="text"
          label="Issue key"
          placeholder="ABC-123"
          instructions="Enter the key for the issue you want to log time on"
          :autocomplete-items="issuesAutocomplete"
          class="flex-1"
        />
      </div>
    </template>
  </div>
</template>

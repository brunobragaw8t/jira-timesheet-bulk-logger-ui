<script setup lang="ts">
const settings = useSettings()

onMounted(() => {
  settings.get()
  settings.loading.value = false
})
</script>

<template>
  <div>
    <div
      v-if="settings.loading.value"
      class="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50"
    >
      <Icon
        name="svg-spinners:90-ring-with-bg"
        class="animate-spin"
        size="4rem"
      />
    </div>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
body {
  @apply bg-gray-900 text-gray-200;
}
</style>

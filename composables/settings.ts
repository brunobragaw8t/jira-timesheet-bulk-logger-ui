import type { SettingsDto } from '~/types/settings-dto.type'

const data: Ref<SettingsDto> = ref({
  cloudId: '',
  email: '',
  apiKey: ''
})

export const useSettings = () => {
  const localStorageKey = 'settings'

  const loading = ref(true)

  function save (): void {
    localStorage.setItem(localStorageKey, JSON.stringify(data.value))
  }

  function get (): void {
    const settingsFromStorage = localStorage.getItem(localStorageKey)

    if (settingsFromStorage) {
      const parsed = JSON.parse(settingsFromStorage) as unknown

      if (parsed && typeof parsed === 'object') {
        if ('cloudId' in parsed && parsed.cloudId && typeof parsed.cloudId === 'string') {
          data.value.cloudId = parsed.cloudId
        }

        if ('email' in parsed && parsed.email && typeof parsed.email === 'string') {
          data.value.email = parsed.email
        }

        if ('apiKey' in parsed && parsed.apiKey && typeof parsed.apiKey === 'string') {
          data.value.apiKey = parsed.apiKey
        }
      }
    }
  }

  return { loading, data, save, get }
}

import type { Project } from '~/types/project-dto.type'

const items = ref<Project[]>([])

const settings = useSettings()

let syncProjectsTimer: NodeJS.Timeout

watch(settings.data.value, () => {
  clearTimeout(syncProjectsTimer)

  syncProjectsTimer = setTimeout(() => {
    useProjects().sync()
  }, 300)
})

export const useProjects = () => {
  async function sync () {
    const result = await fetch(
      settings.apiBase.value + '/project',
      {
        headers: settings.apiHeaders.value
      }
    )

    const json = await result.json()

    for (const project of json) {
      items.value.push({
        key: project.key,
        name: project.name
      })
    }
  }

  return { items, sync }
}

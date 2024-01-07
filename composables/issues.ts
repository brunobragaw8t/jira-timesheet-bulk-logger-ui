type Issue = {
  key: string;
  summary: string;
}

const data = ref<Issue[]>([])

export const useIssues = () => {
  const settings = useSettings()

  const perPage = 100

  async function getIssues (projectKey: string) {
    data.value = []

    const token = btoa(`${settings.data.value.email}:${settings.data.value.apiKey}`).toString()

    const query = encodeURIComponent(`project=${projectKey}`)

    const headers = {
      method: 'GET',
      headers: {
        Authorization: `Basic ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }

    const result = await fetch(
      `${settings.apiBase.value}/search?jql=${query}&fields=summary&maxResults=${perPage}`,
      headers
    )

    const json = await result.json()

    for (const issue of json.issues) {
      data.value.push({
        key: issue.key,
        summary: issue.fields.summary
      })
    }

    const totalIssues = json.total

    const nrCalls = Math.ceil(totalIssues / perPage)

    const apiCalls = []

    // Start at 1, because we already have the first page
    for (let i = 1; i < nrCalls; i++) {
      apiCalls.push(
        fetch(
          `${settings.apiBase.value}/search?jql=${query}&fields=summary&maxResults=${perPage}&startAt=${i * perPage}`,
          headers
        )
      )
    }

    const responses = await Promise.all(apiCalls)

    const jsons = await Promise.all(responses.map(response => response.json()))

    for (const json of jsons) {
      for (const issue of json.issues) {
        data.value.push({
          key: issue.key,
          summary: issue.fields.summary
        })
      }
    }
  }

  return { data, getIssues }
}

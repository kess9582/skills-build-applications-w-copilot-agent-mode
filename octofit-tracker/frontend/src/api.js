const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function getApiUrl(resource) {
  return `${apiBaseUrl}/api/${resource}/`
}

export function normalizeList(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data)) return payload.data
  return []
}

export async function fetchResource(resource) {
  const response = await fetch(getApiUrl(resource))
  if (!response.ok) throw new Error(`Unable to load ${resource}`)
  return normalizeList(await response.json())
}

export { apiBaseUrl }
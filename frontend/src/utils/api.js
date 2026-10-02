const apiBaseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:4000')
  .replace(/\/+$/, '')

export const apiUrl = (path) => `${apiBaseUrl}${path}`

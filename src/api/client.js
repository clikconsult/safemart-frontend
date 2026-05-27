import axios from "axios"

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  withCredentials: true,
});

let refreshPromise = null
/**
 * Auth relies on HttpOnly cookies set by the backend.
 * Keep withCredentials: true so cookies are sent automatically.
 */
api.interceptors.request.use((config) => config)

function shouldRedirectToLogin(error) {
  if (error.response?.status !== 401) return false
  if (error.config?.skipAuthRedirect) return false

  const currentPath = window.location.pathname
  const guestPaths = ["/login", "/register"]

  return !guestPaths.includes(currentPath)
}

function buildLoginRedirectUrl() {
  const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`
  const params = new URLSearchParams({ redirect: currentUrl })

  return `/login?${params.toString()}`
}

async function refreshSession() {
  if (!refreshPromise) {
    refreshPromise = api.post("/auth/refresh", null, {
      skipAuthRedirect: true,
      skipAuthRefresh: true,
    }).finally(() => {
      refreshPromise = null
    })
  }

  return refreshPromise
}

// Handle expired sessions globally without looping on guest routes.
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config || {}

    if (
      error.response?.status === 401 &&
      !originalRequest.skipAuthRefresh &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      try {
        await refreshSession()
        return api(originalRequest)
      } catch {}
    }

    if (shouldRedirectToLogin(error)) {
      window.location.assign(buildLoginRedirectUrl())
    }

    return Promise.reject(error)
  }
)

export default api

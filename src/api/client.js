import axios from "axios"

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  withCredentials: true,
})

// ── Token helpers ──────────────────────────────────────────
export const tokenStorage = {
  get:     ()      => localStorage.getItem("accessToken"),
  set:     (token) => localStorage.setItem("accessToken", token),
  clear:   ()      => localStorage.removeItem("accessToken"),
}

let refreshPromise = null

// ── Attach token to every request ─────────────────────────
api.interceptors.request.use((config) => {
  const token = tokenStorage.get()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

function shouldRedirectToLogin(error) {
  if (error.response?.status !== 401) return false
  if (error.config?.skipAuthRedirect) return false
  const guestPaths = ["/login", "/register"]
  return !guestPaths.includes(window.location.pathname)
}

function buildLoginRedirectUrl() {
  const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`
  return `/login?${new URLSearchParams({ redirect: currentUrl })}`
}

async function refreshSession() {
  if (!refreshPromise) {
    refreshPromise = api.post("/auth/refresh", null, {
      skipAuthRedirect: true,
      skipAuthRefresh: true,
    })
    .then((res) => {
      // Save the new access token returned in the response body
      const newToken = res.data?.accessToken
      if (newToken) tokenStorage.set(newToken)
      return res
    })
    .finally(() => { refreshPromise = null })
  }
  return refreshPromise
}

api.interceptors.response.use(
  (res) => {
    // Auto-save accessToken if backend returns it in response body
    const token = res.data?.accessToken
    if (token) tokenStorage.set(token)
    return res
  },
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
      } catch {
        tokenStorage.clear()
      }
    }

    if (shouldRedirectToLogin(error)) {
      window.location.assign(buildLoginRedirectUrl())
    }

    return Promise.reject(error)
  }
)

export default api
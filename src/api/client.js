import axios from "axios"

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  withCredentials: true,
})

// ── Token helpers ──────────────────────────────────────────
export const tokenStorage = {
  getAccess:     ()      => localStorage.getItem("accessToken"),
  setAccess:     (token) => localStorage.setItem("accessToken", token),
  getRefresh:    ()      => localStorage.getItem("refreshToken"),
  setRefresh:    (token) => localStorage.setItem("refreshToken", token),
  clear:         ()      => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
  },
}

let refreshPromise = null

// ── Attach token to every request ─────────────────────────
api.interceptors.request.use((config) => {
  const token = tokenStorage.getAccess()
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
    refreshPromise = api.post("/auth/refresh", 
      { refreshToken: tokenStorage.getRefresh() }, // send in body
      {
        skipAuthRedirect: true,
        skipAuthRefresh: true,
      }
    )
    .then((res) => {
      const { accessToken, refreshToken } = res.data
      if (accessToken) tokenStorage.setAccess(accessToken)
      if (refreshToken) tokenStorage.setRefresh(refreshToken)
      return res
    })
    .finally(() => { refreshPromise = null })
  }
  return refreshPromise
}

api.interceptors.response.use(
  (res) => {
    const { accessToken, refreshToken } = res.data || {}
    if (accessToken) tokenStorage.setAccess(accessToken)
    if (refreshToken) tokenStorage.setRefresh(refreshToken)
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
import axios from "axios"

const api = axios.create({
  baseURL: "https://api.safemartng.com/api/v1",
  withCredentials: true,
})
/**
 * Auth relies on HttpOnly cookies set by the backend.
 * Keep withCredentials: true so cookies are sent automatically.
 */
api.interceptors.request.use((config) => config)

// Handle 401 globally by redirecting to login.
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  }
)

export default api

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { authApi } from '../api/services'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  // On mount: restore session from HttpOnly cookies (no localStorage token)
  useEffect(() => {
    authApi.me()
      .then(res => setUser(res.data.data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (email, password) => {
    const res = await authApi.login({ email, password })
    setUser(res.data.data)
    return res.data
  }, [])

  const register = useCallback(async (data) => {
    const res = await authApi.register(data)
    setUser(res.data.data)
    return res.data
  }, [])

  const logout = useCallback(async () => {
    try { await authApi.logout() } catch {}
    setUser(null)
  }, [])

  const isAdmin = user?.role === 'admin'

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

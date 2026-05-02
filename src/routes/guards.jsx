import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Redirect to login if not authenticated
export function ProtectedRoute() {
  const { user, loading } = useAuth()
  const location = useLocation()
  if (loading) return <div className="min-h-screen flex items-center justify-center"><Spinner /></div>
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />
  return <Outlet />
}

// Redirect to home if not admin
export function AdminRoute() {
  const { user, isAdmin, loading } = useAuth()
  if (loading) return <div className="min-h-screen flex items-center justify-center"><Spinner /></div>
  if (!user || !isAdmin) return <Navigate to="/" replace />
  return <Outlet />
}

// Redirect away if already logged in
export function GuestRoute() {
  const { user, loading } = useAuth()
  if (loading) return <div className="min-h-screen flex items-center justify-center"><Spinner /></div>
  if (user) return <Navigate to="/" replace />
  return <Outlet />
}

function Spinner() {
  return (
    <div className="w-6 h-6 border-2 border-ink-200 border-t-ink rounded-full animate-spin" />
  )
}


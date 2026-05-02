import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"
import { adminApi } from "../../api/services"
import { LoadingPage, Pagination } from "../../components/ui"

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const fetchUsers = async () => {
    setLoading(true)

    try {
      const res = await adminApi.getUsers({ page, limit: 20 })
      setUsers(res.data.data)
      setPages(res.data.pages)
    } catch {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [page])

  const toggleStatus = async (id) => {
    try {
      await adminApi.toggleStatus(id)
      toast.success("Updated")
      fetchUsers()
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed")
    }
  }

  const changeRole = async (id, role) => {
    try {
      await adminApi.changeRole(id, role)
      toast.success("Updated")
      fetchUsers()
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed")
    }
  }

  return (
    <div className="bg-surface min-h-screen">
      <div className="bg-surface-container-low">
        <div className="container-main py-10">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/admin" className="label-overline text-secondary hover:text-on-surface transition-colors">&larr; Dashboard</Link>
          </div>
          <h1 className="headline-lg text-4xl text-on-surface">Users</h1>
        </div>
      </div>

      <div className="container-main py-10">
        {loading ? <LoadingPage /> : (
          <>
            <div className="bg-surface-container-low rounded-md ghost-border divide-y divide-outline-variant/10 mb-8">
              {users.length === 0 && <p className="font-body text-sm text-secondary p-6">No users found.</p>}
              {users.map(user => (
                <div key={user._id} className="flex items-center gap-4 px-6 py-4 flex-wrap hover:bg-surface-container transition-colors">
                  <div className="w-9 h-9 rounded-full bg-on-surface flex items-center justify-center text-inverse-on-surface font-headline font-black text-sm shrink-0">
                    {user.fullName?.[0]?.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-headline font-bold text-sm text-on-surface">{user.fullName}</p>
                    <p className="font-label text-[10px] text-secondary uppercase tracking-wider">{user.email}</p>
                  </div>
                  <span className={`status-badge ${user.isActive ? "bg-surface-container-high text-on-surface" : "bg-error-container text-error"}`}>
                    {user.isActive ? "Active" : "Suspended"}
                  </span>
                  <select value={user.role} onChange={e => changeRole(user._id, e.target.value)} className="input-field w-auto py-1.5 text-xs font-label uppercase tracking-wider">
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button
                    onClick={() => toggleStatus(user._id)}
                    className={`label-overline transition-colors ${user.isActive ? "text-error hover:text-on-surface" : "text-tertiary hover:text-on-surface"}`}
                  >
                    {user.isActive ? "Suspend" : "Activate"}
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Pagination page={page} pages={pages} onPageChange={setPage} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

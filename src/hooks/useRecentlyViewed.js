import { useState, useCallback } from "react"

const KEY = "safemart_recently_viewed"
const MAX = 8

export function useRecentlyViewed() {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) || [] }
    catch { return [] }
  })

  const add = useCallback((product) => {
    setItems(prev => {
      const filtered = prev.filter(p => p._id !== product._id)
      const next = [product, ...filtered].slice(0, MAX)
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    })
  }, [])

  return { items, add }
}


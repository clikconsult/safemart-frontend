import { useState, useEffect, useCallback } from "react"

const KEY = "safemart_wishlist"

export function useWishlist() {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) || [] }
    catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items))
  }, [items])

  const toggle = useCallback((product) => {
    setItems(prev => {
      const exists = prev.find(p => p._id === product._id)
      if (exists) return prev.filter(p => p._id !== product._id)
      return [...prev, product]
    })
  }, [])

  const isWishlisted = useCallback((id) => items.some(p => p._id === id), [items])
  const clear = useCallback(() => setItems([]), [])

  return { items, toggle, isWishlisted, clear, count: items.length }
}


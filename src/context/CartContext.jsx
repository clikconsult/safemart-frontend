import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { cartApi } from '../api/services'
import { useAuth } from './AuthContext'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const { user } = useAuth()
  const [cart, setCart]       = useState({ items: [], totalItems: 0, totalPrice: 0 })
  const [loading, setLoading] = useState(false)

  const fetchCart = useCallback(async () => {
    if (!user) { setCart({ items: [], totalItems: 0, totalPrice: 0 }); return }
    try {
      setLoading(true)
      const res = await cartApi.get()
      setCart(res.data.data)
    } catch {}
    finally { setLoading(false) }
  }, [user])

  useEffect(() => { fetchCart() }, [fetchCart])

  const addToCart = async (productId, quantity = 1) => {
    const res = await cartApi.add({ productId, quantity })
    setCart(res.data.data)
  }

  const updateItem = async (productId, quantity) => {
    const res = await cartApi.update(productId, quantity)
    setCart(res.data.data)
  }

  const removeItem = async (productId) => {
    const res = await cartApi.remove(productId)
    setCart(res.data.data)
  }

  const clearCart = async () => {
    const res = await cartApi.clear()
    setCart(res.data.data)
  }

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, updateItem, removeItem, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}


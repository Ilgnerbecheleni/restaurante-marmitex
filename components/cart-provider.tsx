"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type CartItem = {
  id: string
  tamanho: string
  preco: string
  quantidade: number
  itens: {
    arroz: string
    feijao: string
    proteina: string
    acompanhamento: string[]
    salada: string[]
  }
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, "quantidade">) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantidade: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  // Carregar carrinho do localStorage quando o componente montar
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error("Erro ao carregar carrinho:", error)
      }
    }
  }, [])

  // Salvar carrinho no localStorage quando mudar
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: Omit<CartItem, "quantidade">) => {
    setCart((prev) => [...prev, { ...item, quantidade: 1 }])
  }

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantidade: number) => {
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantidade } : item)))
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)

"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"

export function CartButton() {
  const { cart } = useCart()

  const totalItems = cart.reduce((total, item) => total + item.quantidade, 0)

  return (
    <Button variant="outline" size="icon" asChild className="relative">
      <Link href="/carrinho">
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
            {totalItems}
          </span>
        )}
        <span className="sr-only">Carrinho</span>
      </Link>
    </Button>
  )
}

import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { CartButton } from "@/components/cart-button"
import { UserNav } from "@/components/user-nav"

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-red-600">
          <ShoppingBag className="h-6 w-6" />
          <span>Marmitex Express</span>
        </Link>
        <div className="flex items-center gap-4">
          <CartButton />
          <UserNav />
        </div>
      </div>
    </header>
  )
}

"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

import { useCartStore } from "@/lib/store/cart-store";

export function Navbar() {
  const items = useCartStore((state) => state.items);

  const cartCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="border-b">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="font-serif text-lg text-foreground">
            店
          </span>

          <span className="h-4 w-px bg-foreground/20" />

          <span className="font-serif text-xl tracking-tight text-foreground">
            MiniStore
          </span>
        </Link>

        <nav className="flex items-center gap-8">
          <Link
            href="/products"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            商品{" "}
            <span className="text-xs text-muted-foreground/60">
              / Products
            </span>
          </Link>

          <Link
            href="/story"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            私たち{" "}
            <span className="text-xs text-muted-foreground/60">
              / Story
            </span>
          </Link>

          <Link
            href="/cart"
            className="relative text-muted-foreground transition-colors hover:text-foreground"
            aria-label={`Cart with ${cartCount} items`}
          >
            <ShoppingCart className="h-5 w-5" />

            {cartCount > 0 && (
              <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-medium text-background">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
import Link from "next/link";

export function Navbar() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="font-serif text-lg text-foreground">店</span>
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
            商品 <span className="text-xs text-muted-foreground/60">/ Products</span>
          </Link>
          <Link
            href="/story"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            私たち <span className="text-xs text-muted-foreground/60">/ Story</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
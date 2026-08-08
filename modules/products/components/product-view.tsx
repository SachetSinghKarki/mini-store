"use client"

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ProductCard } from "./product-card";

export function ProductView() {
  const trpc = useTRPC();

  const { data: products } = useSuspenseQuery(trpc.products.list.queryOptions());

  if(!products) {
    <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-6 py-24 text-center">
      <span className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
        商品 — Products
      </span>

      <div className="mt-8 h-px w-12 bg-foreground/20" />

      <p className="mt-8 max-w-sm text-sm leading-relaxed text-muted-foreground">
        We&apos;re preparing each piece with the same care you&apos;ll see it
        made with. Check back soon.
      </p>
    </div>
  }

  return (
     
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
     
  );
}
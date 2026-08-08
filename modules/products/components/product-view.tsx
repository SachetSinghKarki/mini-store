"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

import { ProductCard } from "./product-card";
import { ProductSearch } from "./product-search";

type ProductViewProps = {
  search?: string;
};

export function ProductView({
  search,
}: ProductViewProps) {
  const trpc = useTRPC();

  const { data: products } = useSuspenseQuery(
    trpc.products.list.queryOptions({
      search,
    }),
  );

  return (
    <div>
      {/* HEADER */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl">
            商品 — Products
          </h1>

          <div className="mt-8 h-px w-12 bg-foreground/20" />

          <p className="mt-8 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {search
              ? `Search results for "${search}"`
              : "Discover our carefully selected products."}
          </p>
        </div>

        {/* SEARCH — ALWAYS VISIBLE */}
        <ProductSearch />
      </div>

      {/* RESULTS */}
      {products.length === 0 ? (
        <div className="py-16 text-center">
          <h2 className="font-serif text-2xl">
            No products found
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Try searching for something else.
          </p>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
}
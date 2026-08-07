"use client"

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export function ProductView() {
  const trpc = useTRPC();

  const { data:hello } = useSuspenseQuery(trpc.products.hello.queryOptions());

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">{hello}</h1>
    </div>
  );
}

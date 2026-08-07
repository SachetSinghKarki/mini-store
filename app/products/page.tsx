import { Loading } from "@/modules/products/components/Loading";
import { ProductView } from "@/modules/products/components/product-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary,dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";

export default function ProductsPage() {
  const queryClient = getQueryClient()

  void queryClient.prefetchQuery(
    trpc.products.hello.queryOptions()
  )
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
     <Suspense fallback={<Loading/>}>
     <ProductView/>
     </Suspense>
    </HydrationBoundary>
  );
}

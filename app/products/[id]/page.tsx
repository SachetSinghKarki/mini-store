import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getQueryClient, trpc } from "@/trpc/server";

import { ProductDetailView } from "@/modules/products/components/product-detail-view";
import { Suspense } from "react";
import { Loading } from "@/modules/products/components/Loading";

type ProductDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(
    trpc.products.getById.queryOptions({
      id,
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<Loading />}>
        <ProductDetailView productId={id} />
      </Suspense>
    </HydrationBoundary>
  );
}

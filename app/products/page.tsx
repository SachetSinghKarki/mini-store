import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";

import { ProductView } from "@/modules/products/components/product-view";

type ProductsPageProps = {
  searchParams: Promise<{
    search?: string;
  }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;

  const search = params.search || undefined;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(
    trpc.products.list.queryOptions({
      search,
    }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductView search={search} />
    </HydrationBoundary>
  );
}
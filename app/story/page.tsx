import Story from "@/components/Story";
import { Loading } from "@/modules/products/components/Loading";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <Story />
    </Suspense>
  );
}

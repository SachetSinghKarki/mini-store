import { ProductForm } from "@/modules/products/components/product-form";

export default function CreateProductPage() {
  return(
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-8">
      <div className="w-full max-w-2xl">
        <ProductForm />
      </div>
    </div>
  );
}
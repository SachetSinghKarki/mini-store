"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useCartStore } from "@/lib/store/cart-store";

type ProductDetailViewProps = {
  productId: string;
};

export function ProductDetailView({
  productId,
}: ProductDetailViewProps) {
  const trpc = useTRPC();

  const addItem = useCartStore((state) => state.addItem);

  const { data: product } = useSuspenseQuery(
    trpc.products.getById.queryOptions({
      id: productId,
    }),
  );

  // Get ALL images
  const images = product.media.filter(
    (media) => media.type === "IMAGE",
  );

  // Currently selected image
  const [selectedImageIndex, setSelectedImageIndex] =
    React.useState(0);

  const selectedImage = images[selectedImageIndex];

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: selectedImage
        ? {
            key: selectedImage.key,
            url: selectedImage.url,
          }
        : undefined,
    });
  };

  return (
    <main className="container mx-auto max-w-6xl px-6 py-10 sm:py-16">
      {/* BACK TO PRODUCTS */}
      <Link
        href="/products"
        className="mb-8 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* ========================= */}
        {/* PRODUCT MEDIA */}
        {/* ========================= */}

        <div>
          {/* MAIN IMAGE */}
          <div className="overflow-hidden rounded-2xl border bg-muted">
            <div className="relative aspect-square">
              {selectedImage ? (
                <Image
                  src={selectedImage.url}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="text-sm text-muted-foreground">
                    No image available
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* IMAGE THUMBNAILS */}
          {images.length > 1 && (
            <div className="mt-4 grid grid-cols-5 gap-3">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() =>
                    setSelectedImageIndex(index)
                  }
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 transition ${
                    selectedImageIndex === index
                      ? "border-foreground"
                      : "border-transparent hover:border-muted-foreground/40"
                  }`}
                  aria-label={`View image ${index + 1}`}
                >
                  <Image
                    src={image.url}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    sizes="100px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ========================= */}
        {/* PRODUCT INFORMATION */}
        {/* ========================= */}

        <div className="flex flex-col justify-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            MiniStore
          </p>

          <h1 className="mt-3 font-serif text-4xl tracking-tight sm:text-5xl">
            {product.name}
          </h1>

          <p className="mt-5 text-2xl font-medium">
            Rs. {product.price.toLocaleString()}
          </p>

          <div className="my-8 h-px bg-border" />

          {/* DESCRIPTION */}
          <div>
            <h2 className="text-sm font-medium">
              Description
            </h2>

            <p className="mt-3 leading-7 text-muted-foreground">
              {product.description}
            </p>
          </div>

          {/* MEDIA INFO */}
          {product.media.length > 0 && (
            <div className="mt-8 space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4" />
                Product media included
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4" />

                {product.media.length} media{" "}
                {product.media.length === 1
                  ? "file"
                  : "files"}
              </div>
            </div>
          )}

          {/* ACTIONS */}
          <div className="mt-10 space-y-3">
            <Button
              onClick={handleAddToCart}
              className="h-12 w-full"
              size="lg"
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>

            <Button
              
              variant="outline"
              className="h-12 w-full"
              size="lg"
            >
              <Link href="/products">
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
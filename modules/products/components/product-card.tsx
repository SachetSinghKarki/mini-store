"use client";

import Link from "next/link";
import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart-store";

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    media: {
      id: string;
      key: string;
      url: string;
      type: "IMAGE" | "VIDEO";
    }[];
  };
};

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const image = product.media.find((media) => media.type === "IMAGE");

  function handleAddToCart() {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: image
        ? {
            key: image.key,
            url: image.url,
          }
        : undefined,
    });
  }

  return (
    <Card className="overflow-hidden">
      {/* PRODUCT DETAIL LINK */}
      <Link href={`/products/${product.id}`}>
        {/* IMAGE */}
        <div className="relative aspect-square bg-muted">
          {image ? (
            <Image
              src={image.url}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="text-sm text-muted-foreground">No image</span>
            </div>
          )}
        </div>

        {/* PRODUCT INFORMATION */}
        <CardHeader className="p-4 pb-2">
          <CardTitle className="font-serif text-base font-normal tracking-tight text-foreground">
            {product.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-4 pt-0">
          <p className="line-clamp-1 text-xs text-muted-foreground">
            {product.description}
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            Rs. {product.price.toLocaleString()}
          </p>
        </CardContent>
      </Link>

      {/* ADD TO CART */}
      <div className="px-4 pb-4">
        <Button onClick={handleAddToCart} className="w-full">
          Add to Cart
        </Button>
      </div>
    </Card>
  );
}

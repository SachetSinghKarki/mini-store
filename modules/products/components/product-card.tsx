"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { useCartStore} from '@/lib/store/cart-store'

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

  const image = product.media.find(
    (media) => media.type === "IMAGE"
  );

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
    <Card>
      {image ? (
        <div className="relative aspect-square overflow-hidden rounded-t-xl">
          <Image
            src={image.url}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex aspect-square items-center justify-center rounded-t-xl bg-muted">
          <span className="text-sm text-muted-foreground">
            No image
          </span>
        </div>
      )}

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
          Rs. {product.price}
        </p>

        <Button
          onClick={handleAddToCart}
          className="mt-4 w-full"
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
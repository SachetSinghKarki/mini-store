import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

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
  const image = product.media.find((media) => media.type === "IMAGE");

  return (
    <Card className="gap-0 overflow-hidden rounded-none border-none bg-transparent p-0 shadow-none">
      <div className="relative aspect-4/5 w-full overflow-hidden bg-muted">
        {image ? (
          <Image
            src={image.url}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground/50">
            No image
          </div>
        )}
      </div>

      <CardHeader className="p-0 pt-4">
        <CardTitle className="font-serif text-base font-normal tracking-tight text-foreground">
          {product.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 pt-1">
        <p className="line-clamp-1 text-xs text-muted-foreground">
          {product.description}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Rs. {product.price}
        </p>
      </CardContent>
    </Card>
  );
}
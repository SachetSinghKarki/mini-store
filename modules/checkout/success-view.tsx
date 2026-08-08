"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCartStore } from "@/lib/store/cart-store";

export function SuccessView() {
  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center px-6 py-16">
      <Card className="w-full">
        <CardContent className="flex flex-col items-center px-6 py-12 text-center sm:px-10">
          {/* SUCCESS ICON */}

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-9 w-9 text-green-600" />
          </div>

          {/* TITLE */}

          <h1 className="mt-6 font-serif text-3xl">
            Order Placed Successfully
          </h1>

          {/* MESSAGE */}

          <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
            Thank you for your purchase. Your payment was
            successful and your order has been received.
          </p>

          {/* ACTIONS */}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button >
              <Link href="/products">
                Continue Shopping
              </Link>
            </Button>

            <Button
              variant="outline"
              onClick={clearCart}
            >
              Clear Cart
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
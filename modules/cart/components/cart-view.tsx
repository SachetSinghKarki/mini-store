"use client";

import * as React from "react";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useCartStore } from "@/lib/store/cart-store";
import { useTRPC } from "@/trpc/client";

export function CartView() {
  // --------------------------------
  // ZUSTAND CART
  // --------------------------------

  const items = useCartStore((state) => state.items);

  const increaseQuantity = useCartStore(
    (state) => state.increaseQuantity
  );

  const decreaseQuantity = useCartStore(
    (state) => state.decreaseQuantity
  );

  const removeItem = useCartStore(
    (state) => state.removeItem
  );

  const clearCart = useCartStore(
    (state) => state.clearCart
  );

  // --------------------------------
  // COUPON STATE
  // --------------------------------

  const [coupon, setCoupon] = React.useState("");
  const [appliedCoupon, setAppliedCoupon] = React.useState("");
  const [couponError, setCouponError] = React.useState("");

  // --------------------------------
  // TRPC CHECKOUT
  // --------------------------------

  const trpc = useTRPC();

  const checkout = useMutation(
    trpc.checkout.checkout.mutationOptions()
  );

  // --------------------------------
  // SUBTOTAL
  // --------------------------------

  const subtotal = items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  // --------------------------------
  // DISCOUNT
  // --------------------------------

  const discount =
    appliedCoupon === "MINIMAL25"
      ? Math.round(subtotal * 0.25)
      : 0;

  const total = subtotal - discount;

  // --------------------------------
  // APPLY COUPON
  // --------------------------------

  function handleApplyCoupon() {
    const code = coupon.trim().toUpperCase();

    if (!code) {
      setAppliedCoupon("");
      setCouponError("Please enter a coupon code.");
      return;
    }

    if (code === "MINIMAL25") {
      setAppliedCoupon(code);
      setCouponError("");
      return;
    }

    setAppliedCoupon("");
    setCouponError("Invalid coupon code.");
  }

  // --------------------------------
  // CHECKOUT
  // --------------------------------

  async function handleCheckout() {
    try {
      const result = await checkout.mutateAsync({
        items: items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),

        coupon: appliedCoupon || undefined,
      });

      if (result.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  }

  // --------------------------------
  // EMPTY CART
  // --------------------------------

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="font-serif text-3xl">
          Your Cart
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Your cart is currently empty.
        </p>

        <Button asChild className="mt-6">
          <a href="/products">
            Continue Shopping
          </a>
        </Button>
      </div>
    );
  }

  // --------------------------------
  // CART
  // --------------------------------

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      {/* HEADER */}

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl">
            Your Cart
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Review the products you&apos;ve added.
          </p>
        </div>

        <Button
          variant="ghost"
          onClick={clearCart}
          className="text-muted-foreground"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Clear Cart
        </Button>
      </div>

      {/* MAIN CONTENT */}

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* CART ITEMS */}

        <div className="space-y-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex gap-4 p-4">
                {/* IMAGE */}

                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg bg-muted">
                  {item.image ? (
                    <Image
                      src={item.image.url}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                      No image
                    </div>
                  )}
                </div>

                {/* PRODUCT INFO */}

                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div>
                    <h2 className="font-serif text-lg">
                      {item.name}
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Rs.{" "}
                      {item.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* QUANTITY */}

                    <div className="flex items-center rounded-lg border">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                        className="h-8 w-8"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </Button>

                      <span className="w-8 text-center text-sm">
                        {item.quantity}
                      </span>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                        className="h-8 w-8"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </Button>
                    </div>

                    {/* REMOVE */}

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        removeItem(item.id)
                      }
                      className="text-muted-foreground"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ORDER SUMMARY */}

        <Card className="h-fit">
          <CardContent className="p-6">
            <h2 className="font-serif text-xl">
              Order Summary
            </h2>

            <div className="my-5 space-y-4 border-y py-5">
              {/* SUBTOTAL */}

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Subtotal
                </span>

                <span>
                  Rs.{" "}
                  {subtotal.toLocaleString()}
                </span>
              </div>

              {/* SHIPPING */}

              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Shipping
                </span>

                <span>Free</span>
              </div>

              {/* COUPON */}

              <div className="space-y-2">
                <label
                  htmlFor="coupon"
                  className="text-sm font-medium"
                >
                  Coupon Code
                </label>

                <div className="flex gap-2">
                  <input
                    id="coupon"
                    value={coupon}
                    onChange={(event) => {
                      setCoupon(event.target.value);

                      if (couponError) {
                        setCouponError("");
                      }
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        handleApplyCoupon();
                      }
                    }}
                    placeholder="Enter coupon code"
                    className="h-10 min-w-0 flex-1 rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                  />

                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleApplyCoupon}
                  >
                    Apply
                  </Button>
                </div>

                {/* COUPON ERROR */}

                {couponError && (
                  <p className="text-xs text-destructive">
                    {couponError}
                  </p>
                )}

                {/* COUPON SUCCESS */}

                {appliedCoupon && (
                  <p className="text-xs text-green-600">
                    {appliedCoupon} applied — 25% off
                  </p>
                )}
              </div>

              {/* DISCOUNT */}

              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Discount
                  </span>

                  <span className="text-green-600">
                    - Rs.{" "}
                    {discount.toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            {/* TOTAL */}

            <div className="flex items-center justify-between">
              <span className="font-medium">
                Total
              </span>

              <span className="text-lg font-semibold">
                Rs. {total.toLocaleString()}
              </span>
            </div>

            {/* CHECKOUT */}

            <Button
              className="mt-6 w-full"
              onClick={handleCheckout}
              disabled={checkout.isPending}
            >
              {checkout.isPending
                ? "Redirecting to Checkout..."
                : "Checkout"}
            </Button>

            {/* CHECKOUT ERROR */}

            {checkout.isError && (
              <p className="mt-3 text-center text-sm text-destructive">
                {checkout.error.message}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
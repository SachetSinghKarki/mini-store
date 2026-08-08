import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest
) {
  const body = await request.text();

  const signature =
    request.headers.get(
      "stripe-signature"
    );

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error(
      "Webhook signature verification failed:",
      error
    );

    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  try {
    if (
      event.type ===
      "checkout.session.completed"
    ) {
      const session =
        event.data.object as Stripe.Checkout.Session;

      // Prevent duplicate orders
      const existingOrder =
        await prisma.order.findUnique({
          where: {
            stripeSessionId: session.id,
          },
        });

      if (existingOrder) {
        return NextResponse.json({
          received: true,
        });
      }

      // Read metadata
      const itemsJson =
        session.metadata?.items;

      if (!itemsJson) {
        throw new Error(
          "Checkout session has no items metadata."
        );
      }

      const items = JSON.parse(
        itemsJson
      ) as {
        id: string;
        quantity: number;
      }[];

      // Get products from Neon
      const products =
        await prisma.product.findMany({
          where: {
            id: {
              in: items.map(
                (item) => item.id
              ),
            },
          },
        });

      if (
        products.length !== items.length
      ) {
        throw new Error(
          "One or more products no longer exist."
        );
      }

      const productMap = new Map(
        products.map((product) => [
          product.id,
          product,
        ])
      );

      // Calculate the subtotal
      const subtotal = items.reduce(
        (total, item) => {
          const product =
            productMap.get(item.id);

          if (!product) {
            throw new Error(
              "Product not found."
            );
          }

          return (
            total +
            product.price *
              item.quantity
          );
        },
        0
      );

      // Check coupon again on the server
      const coupon =
        session.metadata?.coupon;

      const discount =
        coupon === "MINIMAL25"
          ? Math.round(
              subtotal * 0.25
            )
          : 0;

      const total =
        subtotal - discount;

      // Create Order + OrderItems
      await prisma.order.create({
        data: {
          stripeSessionId:
            session.id,

          total,

          status: "PAID",

          items: {
            create: items.map(
              (item) => {
                const product =
                  productMap.get(
                    item.id
                  );

                if (!product) {
                  throw new Error(
                    "Product not found."
                  );
                }

                return {
                  productId:
                    product.id,

                  quantity:
                    item.quantity,

                  price:
                    product.price,
                };
              }
            ),
          },
        },
      });

      console.log(
        "Order created successfully:",
        session.id
      );
    }

    return NextResponse.json({
      received: true,
    });
  } catch (error) {
    console.error(
      "Webhook processing failed:",
      error
    );

    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
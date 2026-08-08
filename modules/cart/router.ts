import { stripe } from "@/lib/stripe";
import {
  createTRPCRouter,
  publicProcedure,
} from "@/trpc/init";
import { checkoutSchema } from "./schema/checkout";

export const checkoutRouter = createTRPCRouter({
  checkout: publicProcedure
    .input(checkoutSchema)
    .mutation(async ({ ctx, input }) => {
      // -----------------------------------------
      // 1. Get products from Neon
      // -----------------------------------------
      const products = await ctx.prisma.product.findMany({
        where: {
          id: {
            in: input.items.map((item) => item.id),
          },
        },
      });

      // -----------------------------------------
      // 2. Make sure every product exists
      // -----------------------------------------
      if (products.length !== input.items.length) {
        throw new Error(
          "One or more products were not found.",
        );
      }

      // -----------------------------------------
      // 3. Create a product lookup map
      // -----------------------------------------
      const productMap = new Map(
        products.map((product) => [
          product.id,
          product,
        ]),
      );

      // -----------------------------------------
      // 4. Calculate subtotal
      //    Prices come from Neon, NOT the client
      // -----------------------------------------
      const subtotal = input.items.reduce(
        (total, item) => {
          const product = productMap.get(item.id);

          if (!product) {
            throw new Error("Product not found.");
          }

          return (
            total +
            product.price * item.quantity
          );
        },
        0,
      );

      // -----------------------------------------
      // 5. Apply coupon
      // -----------------------------------------
      const discount =
        input.coupon === "MINIMAL25"
          ? Math.round(subtotal * 0.25)
          : 0;

      // -----------------------------------------
      // 6. Calculate final total
      // -----------------------------------------
      const total = subtotal - discount;

      // -----------------------------------------
      // 7. Create Stripe line items
      // -----------------------------------------
      const lineItems = input.items.map(
        (item) => {
          const product = productMap.get(
            item.id,
          );

          if (!product) {
            throw new Error(
              "Product not found.",
            );
          }

          // Apply 25% discount
          const discountedPrice =
            input.coupon === "MINIMAL25"
              ? Math.round(
                  product.price * 0.75,
                )
              : product.price;

          return {
            price_data: {
              currency: "npr",

              product_data: {
                name: product.name,
                description:
                  product.description,
              },

              // --------------------------------
              // IMPORTANT:
              //
              // Neon:
              // 55330 = Rs. 55,330
              //
              // Stripe:
              // 55330 * 100
              // = 5,533,000 minor units
              //
              // Stripe displays:
              // NPR 55,330.00
              // --------------------------------
              unit_amount:
                discountedPrice * 100,
            },

            quantity: item.quantity,
          };
        },
      );

      // -----------------------------------------
      // 8. Create Stripe Checkout Session
      // -----------------------------------------
      const session =
        await stripe.checkout.sessions.create({
          mode: "payment",

          line_items: lineItems,

          success_url:
            `${process.env.NEXT_PUBLIC_APP_URL}/success`,

          cancel_url:
            `${process.env.NEXT_PUBLIC_APP_URL}/cart`,

          // -------------------------------------
          // Save information for webhook
          // -------------------------------------
          metadata: {
            items: JSON.stringify(
              input.items,
            ),

            coupon:
              input.coupon ?? "",

            subtotal:
              subtotal.toString(),

            discount:
              discount.toString(),

            total:
              total.toString(),
          },
        });

      // -----------------------------------------
      // 9. Return Stripe Checkout URL
      // -----------------------------------------
      return {
        url: session.url,
      };
    }),
});
import { stripe } from "@/lib/stripe";
import { createTRPCRouter, publicProcedure } from "@/trpc/init";
import { checkoutSchema } from "./schema/checkout";

export const checkoutRouter = createTRPCRouter({
  checkout: publicProcedure
    .input(checkoutSchema)
    .mutation(async ({ ctx, input }) => {
      // Get the products from Neon
      const products = await ctx.prisma.product.findMany({
        where: {
          id: {
            in: input.items.map((item) => item.id),
          },
        },
      });

      // Make sure every product exists
      if (products.length !== input.items.length) {
        throw new Error("One or more products were not found.");
      }

      // Create a lookup map
      const productMap = new Map(
        products.map((product) => [
          product.id,
          product,
        ])
      );

      // Calculate subtotal using prices from Neon
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
        0
      );

      // Coupon
      const discount =
        input.coupon === "MINIMAL25"
          ? Math.round(subtotal * 0.25)
          : 0;

      const total = subtotal - discount;

      // Create Stripe line items
      const lineItems = input.items.map(
        (item) => {
          const product = productMap.get(
            item.id
          );

          if (!product) {
            throw new Error(
              "Product not found."
            );
          }

          return {
            price_data: {
              currency: "npr",
              product_data: {
                name: product.name,
                description:
                  product.description,
              },
              unit_amount: product.price,
            },
            quantity: item.quantity,
          };
        }
      );

      // Create Stripe Checkout Session
      const session =
        await stripe.checkout.sessions.create({
          mode: "payment",

          line_items: lineItems,

          success_url:
            `${process.env.NEXT_PUBLIC_APP_URL}/success`,

          cancel_url:
            `${process.env.NEXT_PUBLIC_APP_URL}/cart`,

          metadata: {
            items: JSON.stringify(
              input.items
            ),

            coupon:
              input.coupon ?? "",

            total: total.toString(),
          },
        });

      return {
        url: session.url,
      };
    }),
});
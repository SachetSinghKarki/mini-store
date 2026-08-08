import { productRouter } from "@/modules/products/router";
import { createTRPCRouter } from "./init";
import { checkoutRouter } from "@/modules/cart/router";

export const appRouter = createTRPCRouter({
  products: productRouter,
  checkout:checkoutRouter
})

export type AppRouter = typeof appRouter
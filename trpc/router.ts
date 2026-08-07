import { productRouter } from "@/modules/products/router";
import { createTRPCRouter } from "./init";

export const appRouter = createTRPCRouter({
  products: productRouter
})

export type AppRouter = typeof appRouter
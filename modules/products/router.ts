import { createTRPCRouter, publicProcedure } from "@/trpc/init";
import { createProductSchema } from "./schemas/create-product";

export const productRouter = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return "hello products ";
  }),

  create: publicProcedure
    .input(createProductSchema)
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.prisma.product.create({
        data: input,
      });
      return product;
    }),

  list: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.product.findMany();
  }),
});

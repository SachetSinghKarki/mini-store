import { createTRPCRouter, publicProcedure } from "@/trpc/init";
import { createProductSchema } from "./schemas/create-product";
import { getFileUrl } from "@/lib/s3";

export const productRouter = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return "近日発売予定の製品.. Products Coming Soon ";
  }),

 create: publicProcedure
  .input(createProductSchema)
  .mutation(async ({ ctx, input }) => {
    const product = await ctx.prisma.product.create({
      data: {
        name: input.name,
        description: input.description,
        price: input.price,

        media: {
          create: input.media,
        },
      },
    });

    return product;
  }),

  list: publicProcedure.query(async ({ ctx }) => {
    const products = await ctx.prisma.product.findMany({
  include: {
    media: true,
  },
});

return Promise.all(
  products.map(async (product) => ({
    ...product,
    media: await Promise.all(
      product.media.map(async (media) => ({
        ...media,
        url: await getFileUrl(media.key),
      })),
    ),
  })),
);
  }),
});

import { z } from "zod";

export const checkoutSchema = z.object({
  items: z
    .array(
      z.object({
        id: z.string(),
        quantity: z.number().int().positive(),
      })
    )
    .min(1),
  coupon: z.string().optional(),
});

 export type CheckoutSchema = z.infer<typeof checkoutSchema>;

import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 letters"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive(),
  media: z.array(
  z.object({
    key: z.string(),
    type: z.enum(["IMAGE", "VIDEO"]),
  })
)
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;

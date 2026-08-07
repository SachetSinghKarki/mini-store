import { prisma } from "@/lib/prisma";

export async function createTRPCContext() {
  return {
    prisma,
  };
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;

import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const client =
  globalThis.prisma || new PrismaClient({ log: ["query", "info"] });

if (process.env.NODE_ENV !== "production") globalThis.prisma = client;

export default client;

// const globalThis = global as unknown as { prisma: PrismaClient };
//
// export const prisma =
//   globalThis.prisma ||
//   new PrismaClient({
//     log: ["query"],
//   });
//
// if (process.env.NODE_ENV !== "production") globalThis.prisma;
// export default prisma;

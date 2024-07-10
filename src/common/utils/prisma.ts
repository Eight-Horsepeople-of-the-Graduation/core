import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient({
  errorFormat: "pretty",
});

export default prismaClient;

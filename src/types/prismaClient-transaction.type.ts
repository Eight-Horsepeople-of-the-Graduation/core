import { PrismaClient } from "@prisma/client";
import * as runtime from "@prisma/client/runtime/library.js";

export type Transaction = Omit<PrismaClient, runtime.ITXClientDenyList>;

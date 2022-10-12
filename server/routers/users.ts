import { z } from "zod";
import prisma from "../../lib/prisma";
import { router, publicProcedure } from "../trpc";

export const userRouter = router({
  paginate: publicProcedure.query(async () => {
    return {
      users: await prisma.user.findMany(),
    };
  }),
});

// export type definition of API
export type UserRouter = typeof userRouter;

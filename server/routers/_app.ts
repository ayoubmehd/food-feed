import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import { userRouter } from "./users";

export const appRouter = router({
  users: userRouter,
  hello: publicProcedure
    .input(
      z.object({
        text: z.string().nullish(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input?.text ?? "world"}`,
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

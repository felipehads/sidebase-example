import { z } from "zod";
import { publicProcedure, router } from "~/server/trpc/trpc";

export const categoryRouter = router({
    create: publicProcedure
        .input(z.string())
        .mutation(async ({ ctx, input }) => {
            const uc = ctx.useCaseFactory.createCategory()
            await uc.execute(input)
        }),
    findAll: publicProcedure
        .query(async ({ ctx }) => {
            const uc = ctx.useCaseFactory.findAllCategories()
            const categories = await uc.execute()
            return categories
        }),
})
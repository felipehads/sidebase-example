import { publicProcedure, router } from "~/server/trpc/trpc";
import { z } from "zod";
import CreateCategoryUC from "~/server/application/CreateCategoryUC";
import FindAllCategoriesUC from "~/server/application/FindAllCategoriesUC";

const inputFindById = z.number()

export const categoryRouter = router({
    create: publicProcedure
        .input(z.string())
        .mutation(async ({ ctx, input }) => {
            const uc = new CreateCategoryUC(ctx.repositoryFactory)
            await uc.execute(input)
        }),
    findAll: publicProcedure
        .query(async ({ ctx }) => {
            const uc = new FindAllCategoriesUC(ctx.repositoryFactory)
            const categories = await uc.execute()
            return categories
        }),
})
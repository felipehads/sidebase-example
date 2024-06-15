import { publicProcedure, router } from "~/server/trpc/trpc";
import { z } from "zod";
import FindProductsByCategoryIdUC from "~/server/application/FindProductsByCategoryIdUC";
import CreateProductUC from "~/server/application/CreateProductUC";
import DeleteProductByIdUC from "~/server/application/DeleteProductByIdUC";

const createProductValidation = z.object({
    name: z.string(),
    price: z.number(),
    categoryId: z.number()
}
)

export const productRouter = router({
    findProductsByCategoryId: publicProcedure
        .input(z.number().optional())
        .query(async ({ ctx, input }) => {
            const uc = new FindProductsByCategoryIdUC(ctx.repositoryFactory)
            const products = await uc.execute(input)
            return products
        }),
    create: publicProcedure
        .input(createProductValidation)
        .mutation(async ({ ctx, input }) => {
            const uc = new CreateProductUC(ctx.repositoryFactory)
            await uc.execute(input.name, input.price, input.categoryId)
        }),
    delete: publicProcedure.input(z.number()).mutation(({ ctx, input }) => {
        const uc = new DeleteProductByIdUC(ctx.repositoryFactory)
        return uc.execute(input)
    })

})
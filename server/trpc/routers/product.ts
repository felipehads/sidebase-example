import { z } from "zod";
import { publicProcedure, router } from "~/server/trpc/trpc";

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
            const uc = ctx.useCaseFactory.findProductsByCategoryId()
            const products = await uc.execute(input)
            return products
        }),
    create: publicProcedure
        .input(createProductValidation)
        .mutation(async ({ ctx, input }) => {
            const { categoryId, name, price } = input
            const uc = ctx.useCaseFactory.createProduct()
            await uc.execute({ categoryId, name, price })
        }),
    delete: publicProcedure.input(z.number()).mutation(({ ctx, input }) => {
        const uc = ctx.useCaseFactory.deleteProductById()
        return uc.execute(input)
    })

})
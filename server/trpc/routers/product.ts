import {publicProcedure, router} from "~/server/trpc/trpc";
import {z} from "zod";
import {input} from "sucrase/dist/types/parser/traverser/base";

const createProductValidation = z.object({
        name: z.string(),
        price: z.number(),
        categoryId: z.number()
    }
)

export const productRouter = router({
    findAll: publicProcedure
        .input(z.number().nullish())
        .query(async ({ctx, input}) => {
            return ctx.prisma.products.findMany({
                select: {
                    id: true,
                    name: true,
                    price: true,
                    category: true
                },
                where: {
                    ...(input ? {categoryId: input} : {}),
                }
            })
        }),
    create: publicProcedure
        .input(createProductValidation)
        .mutation(async ({ctx, input}) => {
            return ctx.prisma.products.create({
                data: {
                    name: input.name,
                    price: input.price,
                    categoryId: input.categoryId
                }
            })
        }),
    delete: publicProcedure.input(z.number()).mutation(({ctx, input}) => {
        return ctx.prisma.products.delete({where: {id: input}})

    })

})
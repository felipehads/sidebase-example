import {publicProcedure, router} from "~/server/trpc/trpc";
import {z} from "zod";

const inputFindById = z.number()

export const categoryRouter = router({
    findById: publicProcedure
        .input(inputFindById)
        .query(({ctx, input}) => {
            return ctx.prisma.categories.findUnique({
                where: {
                    id: input,
                },
            })
        }),
    create: publicProcedure
        .input(z.string())
        .mutation(async ({ctx, input}) => {
            return ctx.prisma.categories.create({
                data: {
                    name: input,
                }
            })
        }),
    findAll: publicProcedure
        .query(async ({ctx}) => {
            return ctx.prisma.categories.findMany()
        }),
})
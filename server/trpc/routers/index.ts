import {router} from '../trpc'
import {productRouter} from "~/server/trpc/routers/product";
import {categoryRouter} from "~/server/trpc/routers/category";

export const appRouter = router({
    product: productRouter,
    category: categoryRouter,

})

// export type definition of API
export type AppRouter = typeof appRouter

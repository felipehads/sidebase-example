import type { inferAsyncReturnType } from '@trpc/server'
import type { H3Event } from 'h3'
import { RepositoryFactoryDatabase } from '../repositories/RepositoryFactory'
import { UseCaseFactoryDatabase } from '../application/UseCaseFactory'

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export function createContext(_event: H3Event) {
  const repositoryFactory = RepositoryFactoryDatabase.getInstance(_event.context.prisma)
  const useCaseFactory = UseCaseFactoryDatabase.getInstance(repositoryFactory)
  return { useCaseFactory }
}

export type Context = inferAsyncReturnType<typeof createContext>

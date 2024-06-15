import type { inferAsyncReturnType } from '@trpc/server'
import type { H3Event } from 'h3'
import { RepositoryFactoryDatabase } from '../repositories/RepositoryFactory'

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export function createContext(_event: H3Event) {
  /**
   * Add any trpc-request context here. E.g., you could add `prisma` like this (if you've added it via sidebase):
   * ```ts
   * return { prisma: _event.context.prisma }
   * ```
   */
  return { repositoryFactory: new RepositoryFactoryDatabase(_event.context.prisma) }
}

export type Context = inferAsyncReturnType<typeof createContext>

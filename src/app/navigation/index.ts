import { Router, NavigateOptions } from '@tanstack/router'
import { sample } from 'effector'

import { $isAuthorized } from '../../entities/viewer'
import { LOGIN_ROUTE_PATH, NEWS_ROUTE_PATH } from '../../shared/config'
import { absolutePath, navigateFx } from '../../shared/lib/navigation'

import { routeTree } from './routes'

export const router = new Router({ routeTree, defaultPreload: 'intent' })

navigateFx.use(async (params) => {
  // @ts-expect-error. Неясно, почему ошибка, документация сырая
  await router.navigate(params)
})

declare module '@tanstack/router' {
  interface Register {
    router: typeof router
  }
}

sample({
  clock: $isAuthorized,
  fn: (isAuthorized): NavigateOptions => ({
    to: isAuthorized ? absolutePath(NEWS_ROUTE_PATH) : absolutePath(LOGIN_ROUTE_PATH),
  }),
  target: navigateFx,
})

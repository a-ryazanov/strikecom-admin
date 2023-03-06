import { Router } from '@tanstack/router'

import { routeTree } from './routes'

export const router = new Router({ routeTree, defaultPreload: 'intent' })

declare module '@tanstack/router' {
  interface Register {
    router: typeof router
  }
}

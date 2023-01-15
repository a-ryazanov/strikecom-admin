import { createHistoryRouter, redirect } from 'atomic-router'
import { createBrowserHistory } from 'history'

import { newsRoute } from '../../pages/news'
import { routes } from './routes'

const history = createBrowserHistory()
export const router = createHistoryRouter({
  routes,
})

export const $activeRoute = router.$activeRoutes.map((routes) => routes[0])

redirect({
  clock: router.routeNotFound,
  route: newsRoute,
  replace: true,
})

router.setHistory(history)

import { createHistoryRouter, redirect } from 'atomic-router'
import { split } from 'effector'
import { createBrowserHistory } from 'history'

import { $isAuthorized } from '../../entities/viewer'
import { loginRoute } from '../../pages/login'
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

split({
  // @ts-expect-error. Неясно, почему здесь ошибка :(
  source: $isAuthorized,
  match: (value: boolean) => (value ? 'authorized' : 'notAuthorized'),
  cases: {
    authorized: redirect({ route: newsRoute }),
    notAuthorized: redirect({ route: loginRoute }),
  },
})

router.setHistory(history)

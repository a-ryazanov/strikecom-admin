// import { lazy } from '@tanstack/react-router'
import { Route, RootRoute } from '@tanstack/router'

import ConflictsPage from '../../pages/conflicts'
import EventsPage from '../../pages/events'
import LoginPage from '../../pages/login'
import NewsPage from '../../pages/news'
import {
  NEWS_ROUTE_PATH,
  EVENTS_ROUTE_PATH,
  CONFLICTS_ROUTE_PATH,
  LOGIN_ROUTE_PATH,
} from '../../shared/config'

import { App } from '../ui/app'
import { MainLayout } from '../ui/main-layout'

const rootRoute = new RootRoute({
  component: App,
})
const mainRoute = new Route({
  id: 'main-layout',
  getParentRoute: () => rootRoute,
  component: MainLayout,
})

const loginRoute = new Route({
  path: LOGIN_ROUTE_PATH,
  getParentRoute: () => rootRoute,
  component: LoginPage,
})
const newsRoute = new Route({
  path: NEWS_ROUTE_PATH,
  getParentRoute: () => mainRoute,
  component: NewsPage,
})
const eventsRoute = new Route({
  path: EVENTS_ROUTE_PATH,
  getParentRoute: () => mainRoute,
  component: EventsPage,
})
const conflictsRoute = new Route({
  path: CONFLICTS_ROUTE_PATH,
  getParentRoute: () => mainRoute,
  component: ConflictsPage,
})

export const routeTree = rootRoute.addChildren([
  loginRoute,
  mainRoute.addChildren([newsRoute, eventsRoute, conflictsRoute]),
])

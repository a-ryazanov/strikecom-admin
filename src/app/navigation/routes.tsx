import { FireOutlined, AlertOutlined, MessageOutlined } from '@ant-design/icons'
import { createRoutesView } from 'atomic-router-react'

import { ConflictsPage, conflictsRoute } from '../../pages/conflicts'
import { EventsPage, eventsRoute } from '../../pages/events'
import { LoginPage, loginRoute } from '../../pages/login'
import { NewsPage, newsRoute } from '../../pages/news'
import { SidebarLayout } from '../ui/sidebar-layout'

export const mainRoutes = [
  { path: '/news', route: newsRoute, title: 'Новости', icon: MessageOutlined },
  {
    path: '/events',
    route: eventsRoute,
    title: 'События',
    icon: AlertOutlined,
  },
  {
    path: '/conflicts',
    route: conflictsRoute,
    title: 'Конфликты',
    icon: FireOutlined,
  },
]

export const routes = [
  ...mainRoutes,
  {
    path: '/login',
    route: loginRoute,
  },
]

export const RoutesView = createRoutesView({
  routes: [
    { route: newsRoute, view: NewsPage, layout: SidebarLayout },
    { route: eventsRoute, view: EventsPage, layout: SidebarLayout },
    { route: conflictsRoute, view: ConflictsPage, layout: SidebarLayout },
    { route: loginRoute, view: LoginPage },
  ],
})

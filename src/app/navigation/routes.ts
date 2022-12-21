import { createRoutesView } from 'atomic-router-react'

import { ConflictsPage, conflictsRoute } from '../../pages/conflicts'
import { EventsPage, eventsRoute } from '../../pages/events'
import { NewsPage, newsRoute } from '../../pages/news'

export const routes = [
  { path: '/news', route: newsRoute, title: 'Новости' },
  { path: '/events', route: eventsRoute, title: 'События' },
  { path: '/conflicts', route: conflictsRoute, title: 'Конфликты' }
]

export const RoutesView = createRoutesView({
  routes: [
    { route: newsRoute, view: NewsPage },
    { route: eventsRoute, view: EventsPage },
    { route: conflictsRoute, view: ConflictsPage }
  ]
})

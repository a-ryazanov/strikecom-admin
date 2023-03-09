import { createStore, createEvent, sample } from 'effector'

import { fetchNewsFx, News, ListResponseMeta } from '../../../shared/api'

import { formatNews } from '../lib/format-news'

export const fetchNews = createEvent<void>()

const $news = createStore<Array<News>>([]).on(fetchNewsFx.doneData, (_, response) => response.data)
const $newsMeta = createStore<ListResponseMeta | null>(null).on(
  fetchNewsFx.doneData,
  (_, response) => response.meta,
)

export const $formattedNews = $news.map(formatNews)
export const $isLoading = fetchNewsFx.pending

sample({
  clock: fetchNews,
  target: fetchNewsFx,
})

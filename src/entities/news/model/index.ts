import { createStore, createEvent, sample } from 'effector'

import { fetchNewsFx, News, ListResponseMeta, NewsRequestParams } from '../../../shared/api'
import { defaultListParams } from '../../../shared/config'

import { formatNews } from '../lib/format-news'

export const fetchNews = createEvent<void>()
export const changeParams = createEvent<Partial<NewsRequestParams>>()

const $news = createStore<Array<News>>([]).on(fetchNewsFx.doneData, (_, response) => response.data)
const $newsMeta = createStore<ListResponseMeta | null>(null).on(
  fetchNewsFx.doneData,
  (_, response) => response.meta,
)

export const $formattedNews = $news.map(formatNews)
export const $newsParams = createStore<NewsRequestParams>(defaultListParams)
  .on(fetchNewsFx.doneData, (params, response) => ({
    ...params,
    page: response.meta.currentPage,
    perPage: response.meta.perPage,
  }))
  .on(changeParams, (params, payload) => ({
    ...params,
    ...payload,
  }))
export const $isLoading = fetchNewsFx.pending
export const $total = $newsMeta.map((meta) => meta?.total ?? 0)

sample({
  clock: [fetchNews, changeParams],
  source: $newsParams,
  fn: (params) => params,
  target: fetchNewsFx,
})

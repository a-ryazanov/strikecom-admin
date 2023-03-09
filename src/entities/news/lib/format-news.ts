import type { News } from '../../../shared/api'
import { formatToDaytime } from '../../../shared/lib/date'

import type { FormattedNews } from '../model/types'

export const formatNews = (news: Array<News>): Array<FormattedNews> =>
  news.map((item) => ({
    ...item,
    createdAt: formatToDaytime(item.createdAt),
    date: formatToDaytime(item.date),
  }))

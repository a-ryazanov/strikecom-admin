import { News } from '../../../shared/api'

export type FormattedNews = Omit<News, 'createdAt' | 'date'> & { createdAt: string; date: string }

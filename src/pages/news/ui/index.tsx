import { useUnit } from 'effector-react'
import React, { useEffect } from 'react'

import { fetchNews, NewsTable } from '../../../entities/news'
import { CreateNewsButton } from '../../../features/news/create'

import { renderActions } from './table-actions'

export const NewsPage: React.FC = () => {
  const fetchData = useUnit(fetchNews)

  useEffect(() => {
    fetchData()
  }, [])

  return <NewsTable renderActions={renderActions} globalActions={<CreateNewsButton />} />
}

NewsPage.displayName = 'NewsPage'

import { useUnit } from 'effector-react'
import React, { useEffect } from 'react'

import { fetchNews, NewsTable } from '../../../entities/news'

export const NewsPage: React.FC = () => {
  const fetchData = useUnit(fetchNews)

  useEffect(() => {
    fetchData()
  }, [])

  return <NewsTable />
}

NewsPage.displayName = 'NewsPage'

import React from 'react'

import { FormattedNews } from '../../../entities/news'

export const renderActions = (news: FormattedNews): React.ReactNode => {
  return <div>{news.id}</div>
}

import React from 'react'

import { Table } from '../../../shared/ui'
import { newsColumns } from '../lib'

export const NewsPage: React.FC = () => {
  return <Table columns={newsColumns} dataSource={[]}></Table>
}

NewsPage.displayName = 'NewsPage'

import { useUnit } from 'effector-react'
import React from 'react'

import { Table } from '../../../shared/ui'

import { tableColumns } from '../lib/table-columns'
import { $formattedNews, $isLoading } from '../model'

export const NewsTable: React.FC = () => {
  const data = useUnit($formattedNews)
  const isLoading = useUnit($isLoading)

  return <Table columns={tableColumns} dataSource={data} loading={isLoading} />
}

NewsTable.displayName = 'NewsTable'

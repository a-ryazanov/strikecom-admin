import { useUnit } from 'effector-react'
import React from 'react'

import { Table } from '../../../shared/ui'

import { getTableColumns } from '../lib/get-table-columns'
import { $formattedNews, $newsParams, $isLoading, $total, changeParams } from '../model'
import { FormattedNews } from '../model/types'

interface Props {
  renderActions: (news: FormattedNews) => React.ReactNode
}

export const NewsTable: React.FC<Props> = (props) => {
  const [data, total, isLoading, params, onChangeParams] = useUnit([
    $formattedNews,
    $total,
    $isLoading,
    $newsParams,
    changeParams,
  ])
  const { page, perPage } = params
  const columns = getTableColumns(props.renderActions)

  const onPaginationChange = (currentPage: number, currentPerPage: number): void => {
    onChangeParams({
      page: currentPage,
      perPage: currentPerPage,
    })
  }

  return (
    <Table<FormattedNews>
      columns={columns}
      dataSource={data}
      loading={isLoading}
      pagination={{
        pageSize: perPage,
        current: page,
        total,
        onChange: onPaginationChange,
      }}
    />
  )
}

NewsTable.displayName = 'NewsTable'

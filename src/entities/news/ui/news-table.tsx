import { TableProps } from 'antd'
import { useUnit } from 'effector-react'
import React from 'react'

import { formatTableSorting } from '../../../shared/lib/format-table-sorting'
import { Table } from '../../../shared/ui'

import { getTableColumns } from '../lib/get-table-columns'
import { $formattedNews, $newsParams, $isLoading, $total, changeParams } from '../model'
import { FormattedNews } from '../model/types'

interface Props {
  renderActions: (news: FormattedNews) => React.ReactNode
  globalActions: React.ReactNode
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
  const columns = getTableColumns(props.renderActions, params)

  const onTableChange: TableProps<FormattedNews>['onChange'] = (
    pagination,
    filters,
    sorting,
    { action },
  ): void => {
    if (action === 'paginate') {
      onChangeParams({
        page: pagination.current,
        perPage: pagination.pageSize,
      })
    }

    if (action === 'sort') {
      onChangeParams(formatTableSorting<FormattedNews>(sorting))
    }
  }

  const onSearch = (search: string): void => {
    onChangeParams({
      fulltext: search,
    })
  }

  return (
    <Table<FormattedNews>
      columns={columns}
      dataSource={data}
      loading={isLoading}
      onChange={onTableChange}
      onSearch={onSearch}
      actions={props.globalActions}
      pagination={{
        pageSize: perPage,
        current: page,
        total,
      }}
    />
  )
}

NewsTable.displayName = 'NewsTable'

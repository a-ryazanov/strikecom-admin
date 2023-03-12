import { Table as UITable, TableProps } from 'antd'
import React from 'react'

export const Table = <T extends object>(props: TableProps<T>): ReturnType<React.FC> => {
  const { pagination, ...restProps } = props

  return (
    <UITable
      rowKey="id"
      showSorterTooltip={false}
      pagination={{
        ...pagination,
        position: ['bottomLeft'],
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: [10, 20, 50],
      }}
      {...restProps}
    ></UITable>
  )
}

Table.displayName = 'Table'

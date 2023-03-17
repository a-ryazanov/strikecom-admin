import { Table as UITable, TableProps as UITableProps, Input } from 'antd'
import React from 'react'

import './table.css'

interface TableProps<T> extends UITableProps<T> {
  onSearch: (value: string) => void
}

export const Table = <T extends object>(props: TableProps<T>): ReturnType<React.FC> => {
  const { pagination, onSearch, ...restProps } = props

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
      title={() => (
        <Input.Search
          onSearch={props.onSearch}
          style={{ width: 300 }}
          placeholder="Поиск"
          enterButton="Искать"
          size="middle"
          allowClear
        />
      )}
      {...restProps}
    ></UITable>
  )
}

Table.displayName = 'Table'

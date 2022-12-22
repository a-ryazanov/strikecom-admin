import { Table as UITable, TableProps } from 'antd'
import React from 'react'

export const Table = <T extends object>(props: TableProps<T>): ReturnType<React.FC> => {
  return <UITable {...props}></UITable>
}

Table.displayName = 'Table'

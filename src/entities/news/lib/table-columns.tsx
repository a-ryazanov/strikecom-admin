import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { TableProps } from 'antd'
import React from 'react'

import { FormattedNews } from '../model/types'

export const tableColumns: TableProps<FormattedNews>['columns'] = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Заголовок',
    dataIndex: 'titleRu',
    width: 600,
  },
  {
    title: 'Дата создания',
    dataIndex: 'createdAt',
    sorter: true,
    showSorterTooltip: false,
  },
  {
    title: 'Просмотры',
    dataIndex: 'views',
  },
  {
    title: 'Публикация',
    dataIndex: 'published',
    align: 'center',
    render: (value: boolean) =>
      value ? (
        <CheckOutlined style={{ color: '#52c41a' }} />
      ) : (
        <CloseOutlined style={{ color: '#ff4d4f' }} />
      ),
  },
]

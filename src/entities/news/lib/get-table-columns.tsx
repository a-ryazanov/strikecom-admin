import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { TableProps } from 'antd'
import React from 'react'

import { FormattedNews } from '../model/types'

export const getTableColumns = (
  renderActions: (news: FormattedNews) => React.ReactNode,
): TableProps<FormattedNews>['columns'] => [
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
  {
    title: 'Действия',
    key: 'actions',
    render: (_, news) => renderActions(news),
  },
]

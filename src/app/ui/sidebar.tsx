import { AlertOutlined, FireOutlined, MessageOutlined } from '@ant-design/icons'
import { Link, useRouter } from '@tanstack/react-router'
import { Layout, Menu } from 'antd'
import React from 'react'

import { CONFLICTS_ROUTE_PATH, EVENTS_ROUTE_PATH, NEWS_ROUTE_PATH } from '../../shared/config'
import { absolutePath } from '../../shared/lib/navigation'

export const routes = [
  { path: NEWS_ROUTE_PATH, title: 'Новости', icon: MessageOutlined },
  {
    path: EVENTS_ROUTE_PATH,
    title: 'События',
    icon: AlertOutlined,
  },
  {
    path: CONFLICTS_ROUTE_PATH,
    title: 'Конфликты',
    icon: FireOutlined,
  },
]

export const Sidebar: React.FC = () => {
  const { state } = useRouter()
  const activePathname = state.currentLocation.pathname

  const items = routes.map((item) => ({
    key: item.title,
    pathname: `/${item.path}`,
    // @ts-expect-error. Неясно, почему ошибка, документация сырая
    label: <Link to={absolutePath(item.path)}>{item.title}</Link>,
    icon: <item.icon />,
  }))

  const selectedKeys = items
    .filter((item) => item.pathname === activePathname)
    .map((item) => item.key)

  return (
    <Layout.Sider width={200} collapsible>
      <Menu theme="dark" mode="inline" items={items} selectedKeys={selectedKeys} />
    </Layout.Sider>
  )
}

Sidebar.displayName = 'AppSidebar'

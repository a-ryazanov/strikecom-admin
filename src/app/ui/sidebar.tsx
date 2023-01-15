import { Layout, Menu } from 'antd'
import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'

import React from 'react'

import { $activeRoute } from '../navigation'
import { mainRoutes } from '../navigation/routes'

export const Sidebar: React.FC = () => {
  const activeRoute = useUnit($activeRoute)

  const items = mainRoutes.map((item) => ({
    key: item.title,
    label: <Link to={item.route}>{item.title}</Link>,
    icon: <item.icon />,
    route: item.route,
  }))

  const selectedKeys = items.filter((item) => item.route === activeRoute).map((item) => item.key)

  return (
    <Layout.Sider width={200} collapsible>
      <Menu theme="dark" mode="inline" items={items} selectedKeys={selectedKeys} />
    </Layout.Sider>
  )
}

Sidebar.displayName = 'AppSidebar'

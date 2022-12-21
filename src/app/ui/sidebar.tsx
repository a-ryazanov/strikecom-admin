import { Layout, Menu } from 'antd'
import { Link } from 'atomic-router-react'

import React from 'react'

import { routes } from '../navigation/routes'

export const Sidebar: React.FC = () => {
  const items = routes.map((item) => ({
    key: item.title,
    label: <Link to={item.route}>{item.title}</Link>,
    icon: <item.icon />,
  }))

  return (
    <Layout.Sider width={200} collapsible>
      <Menu theme="dark" mode="inline" items={items} />
    </Layout.Sider>
  )
}

Sidebar.displayName = 'AppSidebar'

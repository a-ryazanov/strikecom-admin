import { Layout, Menu } from 'antd'
import React from 'react'

import './index.css'

import { RoutesView, routes } from '../navigation/routes'

export const App: React.FC = () => {
  const items = routes.map(route => ({ key: route.title, label: route.title }))
  return (
      <Layout className="app">
        <Layout.Sider width={200} collapsible>
          <Menu
              theme="dark"
              mode="inline"
              items={items}
          />
        </Layout.Sider>

        <Layout.Content>
          <RoutesView />
        </Layout.Content>
      </Layout>
  )
}

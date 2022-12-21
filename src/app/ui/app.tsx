import { Layout } from 'antd'
import React from 'react'

import { RoutesView } from '../navigation/routes'
import './app.css'
import { Sidebar } from './sidebar'

export const App: React.FC = () => {
  return (
    <Layout className="app">
      <Sidebar />

      <Layout.Content>
        <RoutesView />
      </Layout.Content>
    </Layout>
  )
}

App.displayName = 'AppRoot'

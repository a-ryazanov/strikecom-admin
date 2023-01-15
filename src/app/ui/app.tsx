import { Layout } from 'antd'
import React from 'react'

import { RoutesView } from '../navigation/routes'
import './app.css'

export const App: React.FC = () => {
  return (
    <Layout className="app">
      <Layout.Content>
        <RoutesView />
      </Layout.Content>
    </Layout>
  )
}

App.displayName = 'AppRoot'

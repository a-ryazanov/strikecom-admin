import { Layout, Spin } from 'antd'
import { useUnit } from 'effector-react'
import React, { useEffect } from 'react'

import { initializeApp, $isAppInitialized } from '../model'
import { RoutesView } from '../navigation/routes'

import './app.css'

export const App: React.FC = () => {
  const isAppInitialized = useUnit($isAppInitialized)
  const initialize = useUnit(initializeApp)

  useEffect(() => {
    initialize()
  }, [])

  return (
    <Layout className="app">
      <Layout.Content className="app__content">
        {isAppInitialized ? <RoutesView /> : <Spin size="large" className="app__loader" />}
      </Layout.Content>
    </Layout>
  )
}

App.displayName = 'AppRoot'

import { Outlet, useRouter } from '@tanstack/react-router'
import { Layout, Spin } from 'antd'
import { useUnit } from 'effector-react'
import React, { useEffect } from 'react'

import { initializeApp, $isAppInitialized } from '../model'

import './app.css'

export const App: React.FC = () => {
  const isAppInitialized = useUnit($isAppInitialized)
  const initialize = useUnit(initializeApp)

  const isRouterIdle = useRouter().state.status === 'idle'

  useEffect(() => {
    initialize()
  }, [])

  return (
    <Layout className="app">
      <Layout.Content className="app__content">
        {isAppInitialized && isRouterIdle ? (
          <Outlet />
        ) : (
          <Spin size="large" className="app__loader" />
        )}
      </Layout.Content>
    </Layout>
  )
}

App.displayName = 'AppRoot'

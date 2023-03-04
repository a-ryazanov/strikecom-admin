import { Layout } from 'antd'
import { useUnit } from 'effector-react'
import React, { useEffect } from 'react'

import { initializeApp } from '../model'
import { RoutesView } from '../navigation/routes'

import './app.css'

export const App: React.FC = () => {
  const initialize = useUnit(initializeApp)

  useEffect(() => {
    initialize()
  }, [])

  return (
    <Layout className="app">
      <Layout.Content>
        <RoutesView />
      </Layout.Content>
    </Layout>
  )
}

App.displayName = 'AppRoot'

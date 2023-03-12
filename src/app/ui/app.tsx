import { Outlet } from '@tanstack/react-router'
import { Layout, Spin } from 'antd'
import { useUnit } from 'effector-react'
import React, { useEffect } from 'react'

import { initializeApp, $isAppInitialized } from '../model'

import styles from './app.module.css'

// React.memo, чтобы избежать повторных рендеров при изменении
// значения любого провайдера.
// https://alexsidorenko.com/blog/react-render-context/
export const App: React.FC = React.memo(() => {
  const [isAppInitialized, initialize] = useUnit([$isAppInitialized, initializeApp])

  useEffect(() => {
    initialize()
  }, [])

  return (
    <Layout className={styles.app}>
      <Layout.Content className={styles.app__content}>
        {isAppInitialized ? <Outlet /> : <Spin size="large" className={styles.app__loader} />}
      </Layout.Content>
    </Layout>
  )
})

App.displayName = 'AppRoot'

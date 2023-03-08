import { Outlet } from '@tanstack/react-router'
import { Layout } from 'antd'
import React, { PropsWithChildren } from 'react'

import { Sidebar } from './sidebar'

export const MainLayout: React.FC<PropsWithChildren> = (props) => {
  return (
    <Layout>
      <Sidebar />

      <Layout.Content>
        <Outlet />
      </Layout.Content>
    </Layout>
  )
}

MainLayout.displayName = 'AppMainLayout'

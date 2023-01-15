import { Layout } from 'antd'
import React, { PropsWithChildren } from 'react'

import { Sidebar } from './sidebar'
import './sidebar-layout.css'

export const SidebarLayout: React.FC<PropsWithChildren> = (props) => {
  return (
    <Layout className="sidebar-layout">
      <Sidebar />

      <Layout.Content>{props.children}</Layout.Content>
    </Layout>
  )
}

SidebarLayout.displayName = 'AppSidebarLayout'

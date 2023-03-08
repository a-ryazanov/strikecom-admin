import { Layout } from 'antd'
import React from 'react'

import { SidebarUserCard } from '../../widgets/sidebar-user-card'
import { SidebarMenu } from './sidebar-menu'

import styles from './sidebar.module.css'

export const Sidebar: React.FC = () => {
  return (
    <Layout.Sider width={200} theme="light" className={styles.sidebar}>
      <SidebarUserCard className={styles.sidebar__userCard} />

      <SidebarMenu />
    </Layout.Sider>
  )
}

Sidebar.displayName = 'Sidebar'

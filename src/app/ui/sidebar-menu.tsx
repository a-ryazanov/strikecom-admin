import { AlertOutlined, FireOutlined, MessageOutlined } from '@ant-design/icons'
import { Link, useRouter } from '@tanstack/react-router'
import { Menu } from 'antd'
import cn from 'classnames'
import React from 'react'

import { CONFLICTS_ROUTE_PATH, EVENTS_ROUTE_PATH, NEWS_ROUTE_PATH } from '../../shared/config'
import { absolutePath } from '../../shared/lib/navigation'

import styles from './sidebar-menu.module.css'

const routes = [
  { path: NEWS_ROUTE_PATH, title: 'Новости', icon: MessageOutlined },
  {
    path: EVENTS_ROUTE_PATH,
    title: 'События',
    icon: AlertOutlined,
  },
  {
    path: CONFLICTS_ROUTE_PATH,
    title: 'Конфликты',
    icon: FireOutlined,
  },
]

export const SidebarMenu: React.FC = () => {
  const { state } = useRouter()
  const activePathname = state.currentLocation.pathname

  const items = routes.map((item) => {
    const pathname = absolutePath(item.path)
    const isActive = pathname === activePathname

    return {
      key: item.title,
      pathname,
      label: (
        // @ts-expect-error. Неясно, почему ошибка, документация сырая
        <Link to={pathname} className={cn(isActive ? styles.menuItem__label_active : null)}>
          {item.title}
        </Link>
      ),
      icon: <item.icon className={cn(isActive ? styles.menuItem__icon_active : null)} />,
    }
  })

  const selectedKeys = items
    .filter((item) => item.pathname === activePathname)
    .map((item) => item.key)

  return <Menu items={items} selectedKeys={selectedKeys} className={styles.menu} />
}

SidebarMenu.displayName = 'SidebarMenu'

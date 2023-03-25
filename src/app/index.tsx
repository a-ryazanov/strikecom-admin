import { RouterProvider } from '@tanstack/react-router'
import { ConfigProvider } from 'antd'
import locale from 'antd/locale/ru_RU'
import React from 'react'
import ReactDOM from 'react-dom/client'

import '../shared/lib/reset.css'

import { router } from './navigation'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider locale={locale}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>,
)

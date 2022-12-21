import { RouterProvider } from 'atomic-router-react'
import React from 'react'
import ReactDOM from 'react-dom/client'

import 'antd/dist/reset.css'

import { router } from './navigation'
import { App } from './ui/app'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>,
)

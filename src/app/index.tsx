import React from 'react'
import ReactDOM from 'react-dom/client'

import 'antd/dist/reset.css'

import './navigation/index'

import { App } from './ui'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)

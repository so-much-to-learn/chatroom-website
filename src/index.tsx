import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import { ContextProvider } from './context/index'

import 'antd/dist/antd.css'
import './index.css'
import App from './App'
import zhCN from 'antd/lib/locale/zh_CN'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')

ReactDOM.render(
    <ContextProvider>
        <App/>
    </ContextProvider>,
    document.getElementById('root')
)

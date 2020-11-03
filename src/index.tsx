import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import { ConfigProvider } from 'antd'

import 'normalize.css/normalize.css'
import 'antd/dist/antd.css'
import './index.css'
import App from './App'
import zhCN from 'antd/lib/locale/zh_CN'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')

ReactDOM.render(
  <ConfigProvider locale={ zhCN }>
    <App/>
  </ConfigProvider>,
  document.getElementById('root')
)

import React from 'react'
import { Provider } from 'mobx-react'
import store from './store'
import Home from './pages/home'
import { HashRouter as Router, Route } from 'react-router-dom'
import Login from './pages/login'
import zhCN from 'antd/lib/locale/zh_CN'
import { ConfigProvider } from 'antd'
import 'moment/locale/zh-cn'
import moment from 'moment'

moment.locale('zh-cn')

function App() {
  return (
    <div className='App'>
      <Provider store={ store }>
        <ConfigProvider locale={ zhCN }>
          <Router>
            <Route path='/' component={ Home } exact/>
            <Route path='/login' component={ Login }/>
          </Router>
        </ConfigProvider>
      </Provider>
    </div>
  )
}

export default App

import React from 'react'
import { Provider } from 'mobx-react'
import store from 'store'
import Home from './pages/home'
import { HashRouter as Router, Route } from 'react-router-dom'
import Login from './pages/login'

export default () => {
    return (
        <div className='App'>
            <Provider store={ store }>
                <Router>
                    <Route path='/' component={ Home } exact/>
                    <Route path='/login' component={ Login }/>
                </Router>
            </Provider>
        </div>
    )
}

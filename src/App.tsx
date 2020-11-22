import React from 'react'
import Home from './pages/home'
import { HashRouter as Router, Route } from 'react-router-dom'
import Login from './pages/login'

export default () => {
    return (
        <div className='App'>
                <Router>
                    <Route path='/' component={ Home } exact/>
                    <Route path='/login' component={ Login }/>
                </Router>
        </div>
    )
}

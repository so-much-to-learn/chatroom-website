import React, { useReducer } from 'react';
import Home from './pages/home';
import { HashRouter as Router, Route } from 'react-router-dom';
import Login from './pages/login';
import { StateContext, DispatchContext, reducer, initContextValue } from './context/index';

export default () => {
  const [state, dispatch] = useReducer(reducer, initContextValue);

  return (
    <div className="App">
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          <Router>
            <Route path="/" component={Home} exact />
            <Route path="/login" component={Login} />
          </Router>
        </DispatchContext.Provider>
      </StateContext.Provider>
    </div>
  );
};

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/" component={ Wallet } />
      {/* <Route path="*" component={ NotFound } /> */}
    </Switch>
  );
}

export default App;

import React from 'react';
import './App.css';
import { Route, Switch, useHistory } from 'react-router-dom';

import LoginPage from './Pages/LoginPage';

function App() {
  const history = useHistory();
  return (
    <main>
      <Switch>
        <Route exact path="/login" component={ LoginPage } />
        <Route exact path="/">
          {history.push('/login')}
        </Route>
      </Switch>
    </main>
  );
}

export default App;

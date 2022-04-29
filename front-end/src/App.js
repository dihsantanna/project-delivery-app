import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/login" component={ LoginPage } />
        <Route exact path="/" component={ LoginPage } />
      </Switch>
    </main>
  );
}

export default App;

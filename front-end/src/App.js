import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Register from './Pages/Register';

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/register" component={ Register } />
      </Switch>
    </main>
  );
}

export default App;

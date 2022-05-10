import React from 'react';
import './App.css';
import { Route, Switch, useHistory } from 'react-router-dom';

import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import ProductsPage from './Pages/ProductsPage';
import CheckoutPage from './Pages/CheckoutPage';

function App() {
  const history = useHistory();
  return (
    <main>
      <Switch>
        <Route exact path="/login" component={ LoginPage } />
        <Route exact path="/register" component={ RegisterPage } />
        <Route exact path="/customer/products" component={ ProductsPage } />
        <Route exact path="/customer/checkout" component={ CheckoutPage } />
        <Route exact path="/">
          {history.location.pathname === '/' ? history.push('/login') : null}
        </Route>
      </Switch>
    </main>
  );
}

export default App;

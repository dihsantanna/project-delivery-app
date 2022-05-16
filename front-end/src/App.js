import React from 'react';
import './App.css';
import { Route, Switch, useHistory } from 'react-router-dom';

import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import ProductsPage from './Pages/ProductsPage';
import OrdersPage from './Pages/OrdersPage';
import CheckoutPage from './Pages/CheckoutPage';
import OrderDetails from './Pages/OrderDetails';
import OrderDetailsSeller from './Pages/OrderDetails-Seller';

function App() {
  const history = useHistory();
  return (
    <main>
      <Switch>
        <Route exact path="/login" component={ LoginPage } />
        <Route exact path="/register" component={ RegisterPage } />
        <Route exact path="/customer/products" component={ ProductsPage } />
        <Route exact path="/customer/checkout" component={ CheckoutPage } />
        <Route exact path="/customer/orders" component={ OrdersPage } />
        <Route exact path="/customer/orders/:id" component={ OrderDetails } />
        <Route exact path="/seller/orders/:id" component={ OrderDetailsSeller } />
        <Route exact path="/">
          {history.location.pathname === '/' ? history.push('/login') : null}
        </Route>
      </Switch>
    </main>
  );
}

export default App;

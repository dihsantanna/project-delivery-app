import React from 'react';
import './App.css';
import { Route, Switch, useHistory } from 'react-router-dom';

import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import ProductsPage from './Pages/ProductsPage';
import OrdersPage from './Pages/OrdersPage';
import CheckoutPage from './Pages/CheckoutPage';

function App() {
  const history = useHistory();
  return (
    <main>
      <Switch>
        <Route exact path="/login" component={ LoginPage } />
        <Route exact path="/register" component={ RegisterPage } />
        <Route exact path="/customer/products" component={ ProductsPage } />
        <Route exact path="/customer/orders" component={ OrdersPage } />
        {
          /* Ao criar a pagina de detalhe de ordem excluir a rota abaixo, pois foi inserida afim de rodar o teste */
        }
        <Route exact path="/customer/orders/:id" component={ OrdersPage } />
        <Route exact path="/customer/checkout" component={ CheckoutPage } />
        <Route exact path="/seller/orders" component={ OrdersPage } />
        <Route exact path="/">
          {history.location.pathname === '/' ? history.push('/login') : null}
        </Route>
      </Switch>
    </main>
  );
}

export default App;

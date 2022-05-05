import React from 'react';
import { useHistory } from 'react-router-dom';

function NavBar() {
  const { name } = JSON.parse(localStorage.getItem('User'));
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.push('/login');
  };

  return (
    <nav>
      <ul>
        <li>
          <button
            type="button"
            data-testid="customer_products__element-navbar-link-products"
            onClick={ () => history.push('/products') }
          >
            Produtos
          </button>
        </li>
        <li>
          <button
            type="button"
            data-testid="customer_products__element-navbar-link-orders"
            onClick={ () => history.push('/orders') }
          >
            Meus Pedidos
          </button>
        </li>
        <li
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { name }
        </li>
        <li>
          <button
            type="button"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ handleLogout }
          >
            Sair
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;

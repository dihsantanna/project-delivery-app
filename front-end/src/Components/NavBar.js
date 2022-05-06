import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import './NavBar.css';

function NavBar({ page }) {
  const { name } = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.push('/login');
  };

  return (
    <nav className="navBar">
      <div className="nav-qd-1">
        <button
          disabled={ page === 'produtos' }
          type="button"
          data-testid="customer_products__element-navbar-link-products"
          onClick={ () => history.push('/products') }
        >
          PRODUTOS
        </button>

        <button
          disabled={ page !== 'produtos' }
          type="button"
          data-testid="customer_products__element-navbar-link-orders"
          onClick={ () => history.push('/orders') }
        >
          MEUS PEDIDOS
        </button>
        <div className="vol" />
      </div>
      <div className="nav-qd-2">
        <div
          className="view-name"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { name }
        </div>

        <button
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ handleLogout }
        >
          Sair
        </button>
      </div>

    </nav>
  );
}

NavBar.propTypes = {
  page: PropTypes.string,
};

NavBar.defaultProps = {
  page: 'produtos',
};

export default NavBar;

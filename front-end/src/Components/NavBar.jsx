import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import './NavBar.css';

function NavBar({ page, role }) {
  const { name } = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.push('/login');
  };

  return (
    <nav className="navBar">
      <div className="nav-qd-1">
        {
          role === 'customer' ? (
            <button
              disabled={ page === 'produtos' }
              type="button"
              data-testid="customer_products__element-navbar-link-products"
              onClick={ () => history.push('/customer/products') }
            >
              PRODUTOS
            </button>
          ) : null
        }

        <button
          disabled={ page === 'orders' }
          type="button"
          data-testid="customer_products__element-navbar-link-orders"
          onClick={ () => history.push(`/${role}/orders`) }
        >
          MEUS PEDIDOS
        </button>
        <div className="vol" />
        {
          role === 'seller' || role === 'administrator' ? (
            <div className="vol" />
          ) : null
        }
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
  role: PropTypes.string,
};

NavBar.defaultProps = {
  page: 'produtos',
  role: 'customer',
};

export default NavBar;

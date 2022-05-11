import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import moment from 'moment';

function DetailsDelivery({ products }) {
  const history = useHistory();
  const [sellers, setSellers] = useState([]);
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');

  const getToken = () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    return token;
  };

  const getUser = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
  };

  const toDetailsOrders = (id) => {
    history.push(`/customer/orders/${id}`);
  };

  const mapProduct = (data) => (
    data.map((product) => ({
      productId: product.id,
      quantity: product.qty,
    }))
  );

  const totalOrder = () => {
    let result = 0;
    products.forEach((value) => { result += value.total; });
    return result;
  };

  const createOrder = async () => {
    const user = getUser();
    const order = {
      products: mapProduct(products),
      totalPrice: totalOrder(),
      userId: user.id,
      sellerId: sellers[0].id,
      deliveryAddress: address,
      deliveryNumber: number,
      status: 'Pendente',
      saleDate: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
    };
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/sales`,
      order,
      { headers: { Authorization: user.token } },
    );
    localStorage.removeItem('carrinho');
    toDetailsOrders(response.data.id);
  };

  const getSeller = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/sellers`,
        { headers: { Authorization: getToken() } },
      );
      if (!data) return false;
      setSellers(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getSeller();
  }, [getSeller]);

  return (
    <div>
      <h1>Detalhes e Endereço para Entregas</h1>
      <form>
        <label htmlFor="select-seller">
          P. Vendedora Responsável:
          <select
            data-testid="customer_checkout__select-seller"
            id="select-seller"
          >
            {sellers.map((seller, index) => (
              <option key={ index } value="select-person">{seller.name}</option>
            ))}
          </select>
        </label>
        <label htmlFor="input-address">
          Endereço:
          <input
            id="input-address"
            data-testid="customer_checkout__input-address"
            type="text"
            value={ address }
            onChange={ (e) => setAddress(e.target.value) }
          />
        </label>
        <label htmlFor="input-addressNumber">
          Número:
          <input
            id="input-addressNumber"
            data-testid="customer_checkout__input-addressNumber"
            type="number"
            value={ number }
            onChange={ (e) => setNumber(e.target.value) }
          />
        </label>
        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
          onClick={ () => createOrder() }
        >
          Finalizar Pedido
        </button>
      </form>
    </div>
  );
}

DetailsDelivery.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    quantity: PropTypes.number,
  })).isRequired,
};

export default DetailsDelivery;

import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function DetailsDelivery() {
  const history = useHistory();
  const [sellers, setSellers] = useState([]);

  const getToken = () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    return token;
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

  const toDetailsOrders = (id) => {
    history.push(`/customer/orders/${id}`);
  };

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
          />
        </label>
        <label htmlFor="input-addressNumber">
          Número:
          <input
            id="input-addressNumber"
            data-testid="customer_checkout__input-addressNumber"
            type="number"
          />
        </label>
        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
          onClick={ () => toDetailsOrders(1) }
        >
          Finalizar Pedido
        </button>
      </form>
    </div>
  );
}

export default DetailsDelivery;

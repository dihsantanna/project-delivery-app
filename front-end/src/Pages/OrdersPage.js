import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../Components/NavBar';
import OrderCard from '../Components/OrderCard';
import keyByRole from '../utils/keyByRole';
import './OrdersPage.css';

export default function OrdersPage() {
  const [ordersList, setOrdersList] = useState([]);
  const [role, setRole] = useState('');
  const mountedRef = useRef(true);
  const history = useHistory();

  const getLocalStorage = (key) => {
    const storage = localStorage.getItem(key);
    return JSON.parse(storage);
  };

  const getOrdersList = useCallback(async () => {
    const { id, token, role: roleType } = getLocalStorage('user');
    const { pathname } = history.location;
    const path = pathname.match(/([a-z]{6,8})\//);
    if (path[1] !== roleType) {
      history.push(`/${roleType}/orders`);
    }
    const { data } = await axios
      .get(`${process.env.REACT_APP_API_URL}/sales?${keyByRole[roleType]}Id=${id}`, {
        headers: { Authorization: token },
      });
    setOrdersList([...data]);
    setRole(roleType);
  }, [history]);

  useEffect(() => {
    getOrdersList();
    return () => {
      mountedRef.current = false;
    };
  }, [getOrdersList]);

  return (
    <div>
      <NavBar page="orders" role={ role } />
      <div className="order-list">
        {
          ordersList.map((
            { id, totalPrice, saleDate, status, deliveryAddress },
          ) => (
            <OrderCard
              key={ id }
              orderNumber={ id }
              id={ id }
              totalPrice={ totalPrice }
              saleDate={ saleDate }
              status={ status }
              role={ role }
              orderAddress={ deliveryAddress }
            />
          ))
        }
      </div>
    </div>
  );
}

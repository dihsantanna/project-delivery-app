import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import NavBar from '../Components/NavBar';
import OrderCard from '../Components/OrderCard';
import './OrdersPage.css';

export default function OrdersPage() {
  const [ordersList, setOrdersList] = useState([]);
  const mountedRef = useRef(true);

  const getLocalStorage = (key) => {
    const storage = localStorage.getItem(key);
    return JSON.parse(storage);
  };

  const getOrdersList = useCallback(async () => {
    const { id, token } = getLocalStorage('user');
    const { data } = await axios
      .get(`${process.env.REACT_APP_API_URL}/sales?userId=${id}`, {
        headers: { Authorization: token },
      });
    setOrdersList([...data]);
  }, []);

  useEffect(() => {
    getOrdersList();
    return () => {
      mountedRef.current = false;
    };
  }, [getOrdersList]);

  return (
    <div>
      <NavBar page="orders" />
      <div className="order-list">
        {
          ordersList.map(({ id, totalPrice, saleDate, status }, index) => (
            <OrderCard
              key={ id }
              orderNumber={ index + 1 }
              id={ id }
              totalPrice={ totalPrice }
              saleDate={ saleDate }
              status={ status }
            />
          ))
        }
      </div>
    </div>
  );
}

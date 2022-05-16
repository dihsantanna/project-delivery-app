import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import toBRL from '../helpers/toBRL';
import './OrderDetails.css';

export default function OrderDetailsSeller() {
  const history = useHistory();

  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);

  const filterOrders = (orders, id) => {
    const data = orders.filter((element) => element.id === Number(id));
    setOrder(data);
  };

  useEffect(() => {
    const { id, token } = JSON.parse(localStorage.getItem('user'));
    const idParams = history.location.pathname.split('/')[3];
    axios.get(`http://localhost:3001/sales?sellerId=${id}`, {
      headers: { authorization: token },
    }).then((res) => {
      console.log(res.data);
      filterOrders(res.data, idParams);
      setLoading(true);
    });
  }, [history]);

  const updateStatus = async (e) => {
    const { name } = e.target;
    const { id, token } = JSON.parse(localStorage.getItem('user'));
    const idParams = history.location.pathname.split('/')[3];
    await axios.patch(`http://localhost:3001/sales/${order[0].id}`, {
      status: name,
    }, {
      headers: { authorization: token },
    });
    await axios.get(`http://localhost:3001/sales?userId=${id}`, {
      headers: { authorization: token },
    }).then((res) => {
      filterOrders(res.data, idParams);
      setLoading(true);
    });
  };

  return (
    <>
      <NavBar page="OrderDetails" />
      <section className="OrderDetails">
        <h1 className="order-details-title">Detalhes do pedido</h1>
        {loading
        && (
          <>
            <section className="order-details-header">
              <span
                data-testid=""
                className="order-details-header-number"
              >
                {`Nº ${order[0].id}`}
              </span>
              <span
                data-testid=""
                className="order-details-header-seller-name"
              >
                {`${order[0].seller_sale.name}`}
              </span>
              <span
                data-testid=""
                className="order-details-header-date"
              >
                {moment(order[0].saleDate).format('DD/MM/YYYY')}
              </span>
              <span
                data-testid=""
                className={
                  `order-details-header-status status__${order[0].status.toLowerCase()}`
                }
              >
                {order[0].status}
              </span>
              <button
                onClick={ (e) => updateStatus(e) }
                type="button"
                name="Preparando"
                className="order-details-header-btn"
                data-testid=""
                disabled={
                  order[0].status === 'Entregue'
                  || order[0].status === 'Preparando'
                  || order[0].status === 'Em Trânsito'
                }
              >
                PREPARAR PEDIDO
              </button>
              <button
                onClick={ (e) => updateStatus(e) }
                type="button"
                name="Em Trânsito"
                className="order-details-header-btn"
                data-testid=""
                disabled={
                  order[0].status === 'Entregue'
                  || order[0].status === 'Em Trânsito'
                  || order[0].status === 'Pendente'
                }
              >
                SAIU PARA ENTREGA
              </button>
            </section>
            <table className="order-details-table">
              <thead>
                <tr>
                  <th className="order-details-table-header">Item</th>
                  <th className="order-details-table-header">Descrição</th>
                  <th className="order-details-table-header">Quantidade</th>
                  <th className="order-details-table-header">Valor Unitário</th>
                  <th className="order-details-table-header">Sub-total</th>
                </tr>
              </thead>
              <tbody>
                {order[0].sale_products.map((e, idx) => (
                  <tr key={ `Row ${idx}` } className="order-details-table-row">
                    <td
                      data-testid=""
                      className="order-details-table-row-number"
                    >
                      {idx + 1}
                    </td>
                    <td
                      className="order-details-table-row-name"
                      data-testid=""
                    >
                      {e.product_sale.name}
                    </td>
                    <td
                      className="order-details-table-row-quantity"
                      data-testid=""
                    >
                      {e.quantity}
                    </td>
                    <td
                      className="order-details-table-row-valor"
                      data-testid=""
                    >
                      {`R$${toBRL(e.product_sale.price)}`}
                    </td>
                    <td
                      className="order-details-table-row-total"
                      data-testid=""
                    >
                      {`${toBRL(e.product_sale.price * e.quantity)}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <section
              data-testid=""
              className="order-details-total-price"
            >
              {toBRL(order[0].totalPrice)}
            </section>
          </>
        )}
      </section>
    </>
  );
}

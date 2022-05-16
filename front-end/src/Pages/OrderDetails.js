import axios from 'axios';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import toBRL from '../helpers/toBRL';
import './OrderDetails.css';

export default function OrderDetails() {
  const history = useHistory();

  const dataTest = {
    seller: 'customer_order_details__element-order-details-label-seller-name',
    orderDate: 'customer_order_details__element-order-details-label-order-date',
    orderStatus: 'customer_order_details__element-order-details-label-delivery-status',
  };

  const [order, setOrder] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const filterOrders = (orders, id) => {
    const teste = orders.filter((element) => element.id === Number(id));
    console.log(teste);
    setOrder(teste);
  };

  useEffect(() => {
    const { id, token } = JSON.parse(localStorage.getItem('user'));
    const idParams = history.location.pathname.split('/')[3];
    if (history.location.pathname.includes('customer')) {
      axios.get(`http://localhost:3001/sales?userId=${id}`, {
        headers: { authorization: token },
      }).then((res) => {
        console.log(res.data);
        filterOrders(res.data, idParams);
        setLoading(true);
      });
    }
  }, [history]);

  const updateStatus = async () => {
    console.log('clicou');
    const { id, token } = JSON.parse(localStorage.getItem('user'));
    const idParams = history.location.pathname.split('/')[3];
    await axios.patch(`http://localhost:3001/sales/${order[0].id}`, {
      status: 'Entregue',
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
                data-testid="customer_order_details__element-order-details-label-order-id"
                className="order-details-header-number"
              >
                {`Nº ${order[0].id}`}
              </span>
              <span
                data-testid={ dataTest.seller }
                className="order-details-header-seller-name"
              >
                {`${order[0].seller_sale.name}`}
              </span>
              <span
                data-testid={ dataTest.orderDate }
                className="order-details-header-date"
              >
                {moment(order[0].saleDate).format('DD/MM/YYYY')}
              </span>
              <span
                data-testid={ dataTest.orderStatus }
                className={
                  `order-details-header-status status__${order[0].status.toLowerCase()}`
                }
              >
                {order[0].status}
              </span>
              <button
                onClick={ () => updateStatus() }
                type="button"
                className="order-details-header-btn"
                data-testid="customer_order_details__button-delivery-check"
                disabled={
                  order[0].status === 'Entregue' || order[0].status === 'Pendente'
                }
              >
                MARCAR COMO ENTREGUE
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
                      data-testid={
                        `customer_order_details__element-order-table-item-number-${idx}`
                      }
                      className="order-details-table-row-number"
                    >
                      {idx + 1}
                    </td>
                    <td
                      className="order-details-table-row-name"
                      data-testid={
                        `customer_order_details__element-order-table-name-${idx}`
                      }
                    >
                      {e.product_sale.name}
                    </td>
                    <td
                      className="order-details-table-row-quantity"
                      data-testid={
                        `customer_order_details__element-order-table-quantity-${idx}`
                      }
                    >
                      {e.quantity}
                    </td>
                    <td
                      className="order-details-table-row-valor"
                      data-testid={
                        `customer_order_details__element-order-table-sub-total-${idx}`
                      }
                    >
                      {`R$${toBRL(e.product_sale.price)}`}
                    </td>
                    <td
                      className="order-details-table-row-total"
                      data-testid={
                        `customer_order_details__element-order-total-price-${idx}`
                      }
                    >
                      {`${toBRL(e.product_sale.price * e.quantity)}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <section
              data-testid="customer_order_details__element-order-total-price"
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

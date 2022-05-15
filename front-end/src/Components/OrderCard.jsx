import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import numberTransform from '../helpers/numberTransform';
import toBRL from '../helpers/toBRL';
import './OrderCard.css';

export default function OrderCard({
  role,
  orderNumber,
  id,
  status,
  saleDate,
  totalPrice,
  orderAddress,
}) {
  const history = useHistory();
  return (
    <button
      type="button"
      className={ `order-card ${role}` }
      onClick={ () => history.push(`/${role}/orders/${id}`) }
    >
      <div className="order-number">
        Pedido
        <div
          data-testid={
            `${role}_orders__element-order-id-${id}`
          }
        >
          {numberTransform(orderNumber)}
        </div>
      </div>
      <div className="order-info">
        <div
          className={ `order-status ${status.toLowerCase()}` }
          data-testid={
            `${role}_orders__element-delivery-status-${id}`
          }
        >
          { status }
        </div>
        <div className="date-price">
          <div
            data-testid={
              `${role}_orders__element-order-date-${id}`
            }
          >
            {moment(saleDate).locale('pt-br').format('DD/MM/YYYY')}
          </div>
          <div>
            {'R$ '}
            <span
              data-testid={
                `${role}_orders__element-card-price-${id}`
              }
            >
              { toBRL(totalPrice) }
            </span>
          </div>
        </div>
        {
          role === 'seller' ? (
            <div className="order-address">
              <div
                data-testid={ `seller_orders__element-card-address-${id}` }
              >
                { `Rua ${orderAddress}` }
              </div>
            </div>
          ) : null
        }
      </div>
    </button>
  );
}

OrderCard.propTypes = {
  role: PropTypes.string.isRequired,
  orderNumber: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  saleDate: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
  orderAddress: PropTypes.string.isRequired,
};

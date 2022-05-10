import PropTypes from 'prop-types';
import React from 'react';

export default function TableProducts({ products, onClick }) {
  return (
    <table className="order-table">
      <thead>
        <tr className="order-table-header">
          <td>Item</td>
          <td>Descrição</td>
          <td>Quantidade</td>
          <td>Valor Unitário</td>
          <td>Sub-total</td>
          <td>Remover Item</td>
        </tr>
      </thead>
      <tbody>
        {products.map((e, index) => (
          <tr className="table-products-row" key={ `Produto: ${index}` }>
            <td
              data-testid={
                `customer_checkout__element-order-table-item-number-${index}`
              }
              className="table-products-number"
            >
              {index}

            </td>
            <td
              data-testid={
                `customer_checkout__element-order-table-name-${index}`
              }
            >
              {e.name}

            </td>
            <td
              data-testid={
                `customer_checkout__element-order-table-quantity-${index}`
              }
            >
              {e.qty}

            </td>
            <td
              data-testid={
                `customer_checkout__element-order-table-sub-total-${index}`
              }
            >
              {e.price}

            </td>
            <td
              data-testid={
                `customer_checkout__element-order-total-price-${index}`
              }
            >
              {Number(e.total).toFixed(2)}
            </td>
            <td>
              <button
                type="button"
                data-testid={ `customer_checkout__element-order-table-remove-${index}` }
                onClick={ () => onClick(index) }
              >
                Remover
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

TableProducts.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    price: PropTypes.string,
  })).isRequired,
  onClick: PropTypes.func.isRequired,
};

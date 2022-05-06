import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import toBRL from '../helpers/toBRL';
import './ProductCard.css';

export default function ProductCard({ id, price, productImage, name, handleProduct }) {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const storage = localStorage.getItem('carrinho');
    if (storage) {
      const product = (JSON.parse(storage)).find((item) => item.id === id);
      if (product) {
        return setQuantity(product.qty);
      }
    }
  }, [id]);

  const handleChange = ({ target: value }) => {
    const qty = /\d+/.test(value.value) ? +value.value : +quantity;
    setQuantity(qty);
    const product = { id, price, productImage, name, qty };
    handleProduct(product);
  };

  const handleRemove = () => {
    if (quantity > 0) {
      const qty = quantity - 1;
      setQuantity(qty);
      const product = { id, price, productImage, name, qty };
      handleProduct(product);
    }
  };

  const handleAdd = () => {
    const qty = quantity + 1;
    setQuantity(qty);
    const product = { id, price, productImage, name, qty };
    handleProduct(product);
  };

  return (
    <div className="product-card">
      <div
        className="productCard-price"
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        {`R$ ${toBRL(price)}`}
      </div>
      <div className="image-container">
        <img
          className="productCard-image"
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          src={ productImage }
          alt={ `${name}-img` }
        />
      </div>
      <div className="info-container">
        <span
          className="productCard-title"
          data-testid={ `customer_products__element-card-title-${id}` }
        >
          {name}
        </span>
        <div className="productCard-btn-container">
          <button
            className="productCard-btn-rm"
            data-testid={ `customer_products__button-card-rm-item-${id}` }
            onClick={ handleRemove }
            type="button"
          >
            -
          </button>
          <input
            type="text"
            value={ quantity }
            data-testid={ `customer_products__input-card-quantity-${id}` }
            onChange={ handleChange }
          />
          <button
            className="productCard-btn-add"
            data-testid={ `customer_products__button-card-add-item-${id}` }
            onClick={ handleAdd }
            type="button"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = ({
  id: PropTypes.number.isRequired,
  price: PropTypes.string.isRequired,
  productImage: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleProduct: PropTypes.func.isRequired,
});

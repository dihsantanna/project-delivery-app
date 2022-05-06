import axios from 'axios';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import ProductCard from '../Components/ProductCard';
import toBRL from '../helpers/toBRL';
import './ProductsPage.css';

export default function ProductsPage() {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalAmountInCart, setTotalAmountInCart] = useState(0);
  const mountedRef = useRef(true);

  const getProducts = useCallback(async () => {
    try {
      const { token } = JSON.parse(localStorage.getItem('user'));
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/products`,
        {
          headers: { Authorization: token },
        });
      if (!mountedRef.current) return null;
      setProducts([...data]);
      const itemsCart = localStorage.getItem('carrinho');
      if (itemsCart) setSelectedProducts(JSON.parse(itemsCart));
      return data;
    } catch (error) {
      console.log(error.message);
      history.push('/login');
      localStorage.clear();
    }
  }, [history]);

  useEffect(() => {
    getProducts();
    return () => {
      mountedRef.current = false;
    };
  }, [getProducts]);

  const getTotalAmountInCart = useCallback(() => {
    const amount = selectedProducts.reduce((acc, curr) => curr.total + acc, 0);
    setTotalAmountInCart(amount);
  }, [selectedProducts]);

  useEffect(() => {
    getTotalAmountInCart();
  }, [getTotalAmountInCart]);

  const selectProduct = (product) => {
    const result = {
      ...product,
      total: (+product.price) * product.qty,
    };

    const isProductSelected = selectedProducts.find((item) => item.id === result.id);

    if (!selectedProducts.length || !isProductSelected) {
      setSelectedProducts([...selectedProducts, result]);
      return localStorage.setItem(
        'carrinho', JSON.stringify([...selectedProducts, result]),
      );
    }

    if (!result.total) {
      const unselectedProduct = selectedProducts
        .filter((item) => item.id !== result.id);
      setSelectedProducts(unselectedProduct);
      return localStorage.setItem('carrinho', JSON.stringify(unselectedProduct));
    }

    const updateSelectedProducts = selectedProducts
      .map((item) => (item.id === product.id ? result : item));
    setSelectedProducts(updateSelectedProducts);

    return localStorage.setItem('carrinho', JSON.stringify(updateSelectedProducts));
  };

  return (
    <div className="main-product-page">
      <NavBar />
      <div className="grade-products">
        {products.map((product) => (
          <ProductCard
            key={ product.id }
            id={ product.id }
            price={ product.price }
            name={ product.name }
            productImage={ product.url_image }
            handleProduct={ selectProduct }
          />
        ))}
      </div>
      <button
        disabled={ !totalAmountInCart }
        type="button"
        className="see-cart-btn"
        onClick={ () => history.push('/customer/checkout') }
        data-testid="customer_products__button-cart"
      >
        Ver Carrinho:
        { ' R$ ' }
        <span
          data-testid="customer_products__checkout-bottom-value"
        >
          { toBRL(totalAmountInCart) }
        </span>
      </button>
    </div>
  );
}

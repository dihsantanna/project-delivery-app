import React, { useEffect, useState } from 'react';
import NavBar from '../Components/NavBar';
import TableProducts from '../Components/TableProducts';

export default function CheckoutPage() {
  const [products, setProducts] = useState([]);

  const getProducts = () => {
    const product = JSON.parse(localStorage.getItem('carrinho'));
    setProducts(product);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const removeItem = (id) => {
    products.splice(id, 1);
    localStorage.setItem(
      'carrinho', JSON.stringify(products),
    );
    getProducts();
  };

  return (
    <div className="main-checkout-page">
      <NavBar page="checkout-page" />
      <div>
        Finalizar Pedidos
        <div>
          <TableProducts products={ products } onClick={ removeItem } />
        </div>
      </div>
    </div>
  );
}

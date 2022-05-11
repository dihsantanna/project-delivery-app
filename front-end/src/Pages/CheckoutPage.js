import React, { useEffect, useState } from 'react';
import NavBar from '../Components/NavBar';
import TableProducts from '../Components/TableProductsCheckout';
import DetailsDelivery from '../Components/DetailsDelivery';
import toBRL from '../helpers/toBRL';

export default function CheckoutPage() {
  const [products, setProducts] = useState([]);

  const getProducts = () => {
    const product = JSON.parse(localStorage.getItem('carrinho'));
    setProducts(product.sort((a, b) => a.id - b.id));
  };

  useEffect(() => {
    getProducts();
  }, []);

  const totalOrder = () => {
    let result = 0;
    products.forEach((value) => { result += value.total; });
    return result;
  };

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
        <div>
          Preço Total: R$
          <span data-testid="customer_checkout__element-order-total-price">
            {toBRL(totalOrder())}
          </span>
        </div>
        <DetailsDelivery products={ products } />
      </div>
    </div>
  );
}

const express = require('express');
const cors = require('cors');

const loginRoute = require('./routes/login.route');
const registerRoute = require('./routes/register.route');
const productsRoute = require('./routes/products.route');
const sellersRoute = require('./routes/sellers.route');
const ordersRoute = require('./routes/orders.route');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/products', productsRoute);
app.use('/images', express.static('public'));
app.use('/sellers', sellersRoute);
app.use('/orders', ordersRoute);

module.exports = app;

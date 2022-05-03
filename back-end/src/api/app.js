const express = require('express');

const loginRoute = require('./routes/login.route');
const productsRoute = require('./routes/products.route');

const app = express();

app.use(express.json());

app.use('/login', loginRoute);
app.use('/products', productsRoute);

module.exports = app;

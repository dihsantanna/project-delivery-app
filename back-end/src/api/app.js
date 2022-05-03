const express = require('express');

const productsRoute = require('./routes/products.route');

const app = express();

app.use(express.json());

app.use('/products', productsRoute);

module.exports = app;

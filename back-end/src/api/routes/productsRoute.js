const { Router } = require('express');

const validateToken = require('../middlewares/token.validate');
const productsControllers = require('../controllers/products.controllers');

const productsRoute = Router();

productsRoute.get('/', validateToken, productsControllers.getAll);
productsRoute.get('/:id', validateToken, productsControllers.getById);

module.exports = productsRoute;
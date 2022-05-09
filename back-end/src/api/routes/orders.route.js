const { Router } = require('express');

const validateToken = require('../middlewares/token.validate');
const ordersControllers = require('../controllers/orders.controllers');

const ordersRoute = Router();

ordersRoute.post('/', validateToken, ordersControllers.create);

module.exports = ordersRoute;
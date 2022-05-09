const { Router } = require('express');

const validateToken = require('../middlewares/token.validate');
const salesControllers = require('../controllers/sales.controllers');

const salesRoute = Router();

salesRoute.post('/', validateToken, salesControllers.create);

module.exports = salesRoute;
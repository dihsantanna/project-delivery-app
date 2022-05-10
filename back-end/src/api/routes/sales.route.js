const { Router } = require('express');

const validateToken = require('../middlewares/token.validate');
const salesControllers = require('../controllers/sales.controllers');

const salesRoute = Router();

salesRoute.post('/', validateToken, salesControllers.create);
salesRoute.get('/:id', validateToken, salesControllers.getById);
salesRoute.get('/', validateToken, salesControllers.getByQuery);
salesRoute.patch('/:id', validateToken, salesControllers.updateStatus);

module.exports = salesRoute;
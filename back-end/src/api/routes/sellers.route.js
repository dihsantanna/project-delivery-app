const { Router } = require('express');

const validateToken = require('../middlewares/token.validate');
const sellersControllers = require('../controllers/sellers.controllers');

const sellersRoute = Router();

sellersRoute.get('/', validateToken, sellersControllers.getAll);

module.exports = sellersRoute;
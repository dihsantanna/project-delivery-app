const { Router } = require('express');
const register = require('../controllers/register.controller');

const route = Router();

route.post('/register', register);

module.exports = route;
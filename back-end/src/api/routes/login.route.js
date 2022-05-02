const { Router } = require('express');
const login = require('../controllers/login.controller');

const route = Router();

route.post('/', login);

module.exports = route;
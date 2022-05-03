const { Router } = require('express');
const login = require('../controllers/login.controller');
const loginFieldsValidate = require('../middlewares/login.validate');

const route = Router();

route.post('/', loginFieldsValidate, login);

module.exports = route;
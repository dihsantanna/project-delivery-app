const { Router } = require('express');
const createUser = require('../controllers/register.controllers');
const validateRegister = require('../middlewares/register.validate');

const route = Router();

route.post('/', validateRegister, createUser);

module.exports = route;
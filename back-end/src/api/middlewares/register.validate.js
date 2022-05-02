const Joi = require('joi');

const schemaRegister = Joi.object({
  name: Joi.string().max(12).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
})

export default schemaRegister;
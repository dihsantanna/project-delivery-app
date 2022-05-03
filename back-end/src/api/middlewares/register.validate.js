const Joi = require('joi');
const { StatusCodes: Code } = require('http-status-codes');

const schemaRegister = Joi.object({
  name: Joi.string().min(12).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const validateRegister = (req, res, next) => {
  const { body } = req;
  const { error } = schemaRegister.validate(body);
  if (error) return res.status(Code.BAD_REQUEST).json({ error: error.message });

  next();
};

module.exports = validateRegister;
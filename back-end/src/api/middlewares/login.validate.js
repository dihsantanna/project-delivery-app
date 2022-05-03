const Joi = require('joi');
const { StatusCodes: code } = require('http-status-codes');

const schema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .min(6)
    .required(),
});

const loginFieldsValidate = (req, res, next) => {
  const { body } = req;
  const { error } = schema.validate(body);
  if (error) return res.status(code.BAD_REQUEST).json({ message: error.message });

  next();
};

module.exports = loginFieldsValidate;

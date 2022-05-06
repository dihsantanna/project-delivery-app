import Joi from 'joi';

const lengthRules = {
  name: 12,
  pass: 6,
};

const registerValidate = Joi.object({
  username: Joi.string().min(lengthRules.name).required(),
  email: Joi.string().email({ tlds: { allow: ['com', 'net', 'br', 'org'] } }).required(),
  password: Joi.string().min(lengthRules.pass).required(),
});

export default registerValidate;

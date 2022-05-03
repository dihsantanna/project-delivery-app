const jwt = require('jsonwebtoken');
const { StatusCodes: code } = require('http-status-codes');
const { readFileSync } = require('fs');

const { User } = require('../../database/models');

const secret = readFileSync('jwt.evaluation.key', 'utf8');

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(code.UNAUTHORIZED).json({ message: 'Token not found' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findOne({ where: { email: decoded.email } });
    if (!user) {
      return res
        .status(code.UNAUTHORIZED)
        .json({ message: 'User not found' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(code.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};

module.exports = validateToken;
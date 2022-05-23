const { StatusCodes } = require('http-status-codes');

const loginPayload = {
  email: "zebirita@email.com",
  password: '$#zebirita#$',
};

const loginMock = {
  id: 3,
  name: "Cliente Zé Birita",
  email: "zebirita@email.com",
  role: "customer",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6IkNsaWVudGUgWsOpIEJpcml0YSIsImVtYWlsIjoiemViaXJpdGFAZW1haWwuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjUzMzM0ODc3fQ.LrekbUZEFbqUzTYufPgsL_pVbLRJEKxmgbLQ1swNg_c"
};

const loginServiceMock = {
  code: StatusCodes.OK,
  message: loginMock,
};

module.exports = {
  loginMock,
  loginPayload,
  loginServiceMock,
};
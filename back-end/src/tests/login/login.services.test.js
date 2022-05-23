const sinon = require('sinon');
const { expect } = require('chai');
const md5 = require('md5');

const { User } = require('../../database/models');
const login = require('../../api/services/login.services');
const { StatusCodes } = require('http-status-codes');
const Mock = require('./login.mock');

describe('Login Service Tests', () => {
  describe('login sucess', () => {
    let hash;
    before(() => {
      hash = md5(Mock.loginPayload.password);
      sinon.stub(User, 'findOne').returns(Mock.loginMock);
    });
    after(() => {
      User.findOne.restore();
    });

    it('should return a login', async () => {
      const result = await login(Mock.loginPayload);
      expect(result.code).to.be.equal(StatusCodes.OK);
    });
  });

  describe('login fail', () => {
    before(() => {
      sinon.stub(User, 'findOne').returns(null);
    });
    after(() => {
      User.findOne.restore();
    });

    it('should return a error', async () => {
      const result = await login(Mock.loginPayload);
      expect(result.code).to.be.equal(StatusCodes.NOT_FOUND);
    });
  });
});
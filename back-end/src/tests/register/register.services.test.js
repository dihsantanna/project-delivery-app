const sinon = require('sinon');
const { expect } = require('chai');

const { User } = require('../../database/models');
const registerServices = require('../../api/services/register.services');
const { StatusCodes } = require('http-status-codes');
const Mock = require('./register.mock');

describe('Register Service Tests', () => {
  describe('createUser sucess', () => {
    before(() => {
      sinon.stub(User, 'create').returns(Mock.registerMock);
    });
    after(() => {
      User.create.restore();
    });

    it('should return a register', async () => {
      const register = await registerServices.createUser(Mock.registerPayload);
      expect(register.code).to.be.equal(StatusCodes.CREATED);
    });
  });

  describe('createUser fail', () => {
    before(() => {
      sinon.stub(User, 'create').rejects();
    });
    after(() => {
      User.create.restore();
    });

    it('should return a error', async () => {
      const register = await registerServices.createUser(Mock.registerPayload);
      expect(register.code).to.be.equal(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });
});
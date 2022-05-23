const sinon = require('sinon');
const { expect } = require('chai');

const { User } = require('../../database/models');
const sellersServices = require('../../api/services/sellers.services');
const { StatusCodes } = require('http-status-codes');
const Mock = require('./sellers.mock');

describe('Seller Service Tests', () => {
  describe('getAll sucess', () => {
    before(() => {
      sinon.stub(User, 'findAll').returns(Mock.sellersMock);
    });
    after(() => {
      User.findAll.restore();
    });

    it('should return all sellers', async () => {
      const sellers = await sellersServices.getAll();
      expect(sellers.code).to.be.equal(StatusCodes.OK);
      expect(sellers.message).to.be.deep.equal(Mock.sellersMock);
    });
  });

  describe('getAll fail', () => {
    before(() => {
      sinon.stub(User, 'findAll').rejects();
    });
    after(() => {
      User.findAll.restore();
    });

    it('should return a error', async () => {
      const sellers = await sellersServices.getAll();
      expect(sellers.code).to.be.equal(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });
});

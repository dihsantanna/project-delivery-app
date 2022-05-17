const sinon = require('sinon');
const { expect } = require('chai');

const sellersServices = require('../../api/services/sellers.services');
const sellersController = require('../../api/controllers/sellers.controllers');
const { StatusCodes } = require('http-status-codes');
const Mock = require('./sellers.mock');

describe('Sellers Controllers tests', () => {
  describe('getAll sucess', () => {
    const response = {};
    const request = null;

    before(async () => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(sellersServices, 'getAll').resolves(Mock.sellersServicesMock);
    });
    after(() => {
      sellersServices.getAll.restore();
    });

    it('should return code 200', async () => {
      await sellersController.getAll(request, response);
      expect(response.status.calledWith(StatusCodes.OK)).to.be.true;
    });
  });

  describe('getAll fail', () => {
    const response = {};
    const request = null;

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(sellersServices, 'getAll').resolves({ code: StatusCodes.INTERNAL_SERVER_ERROR });
    });
    after(() => {
      sellersServices.getAll.restore();
    });

    it('should return a error', async () => {
      await sellersController.getAll(request, response);
      expect(response.status.calledWith(StatusCodes.INTERNAL_SERVER_ERROR)).to.be.true;
    });
  });
});

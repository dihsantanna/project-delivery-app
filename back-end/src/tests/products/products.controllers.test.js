const sinon = require('sinon');
const { expect } = require('chai');

const productsServices = require('../../api/services/products.services');
const productsController = require('../../api/controllers/products.controllers');
const { StatusCodes } = require('http-status-codes');
const Mock = require('./products.mock');

describe('Products Controllers tests', () => {
  describe('getAll sucess', () => {
    const response = {};
    const request = null;

    before(async () => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsServices, 'getAll').resolves(Mock.productsServicesMock);
    });
    after(() => {
      productsServices.getAll.restore();
    });

    it('should return code 200', async () => {
      await productsController.getAll(request, response);
      expect(response.status.calledWith(StatusCodes.OK)).to.be.true;
    });
  });

  describe('getAll fail', () => {
    const response = {};
    const request = null;

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsServices, 'getAll').resolves({ code: StatusCodes.INTERNAL_SERVER_ERROR });
    });
    after(() => {
      productsServices.getAll.restore();
    });

    it('should return a error', async () => {
      await productsController.getAll(request, response);
      expect(response.status.calledWith(StatusCodes.INTERNAL_SERVER_ERROR)).to.be.true;
    });
  });

  describe('getById sucess', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsServices, 'getById').resolves(Mock.productsServicesIdMock);
    });
    after(() => {
      productsServices.getById.restore();
    });

    it('should return a product', async () => {
      await productsController.getById(request, response);
      expect(response.status.calledWith(StatusCodes.OK)).to.be.true;
    });
  });

  describe('getById fail', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productsServices, 'getById').resolves({ code: StatusCodes.NOT_FOUND });
    });
    after(() => {
      productsServices.getById.restore();
    });

    it('should return a error', async () => {
      await productsController.getById(request, response);
      expect(response.status.calledWith(StatusCodes.NOT_FOUND)).to.be.true;
    });
  });
});
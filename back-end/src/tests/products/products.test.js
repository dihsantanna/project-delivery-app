const sinon = require('sinon');
const { expect } = require('chai');

const productsServices = require('../../api/services/products.services');
const { Product } = require('../../database/models');
const { StatusCodes } = require('http-status-codes');
const productsMock = require('./products.mock');

describe('Products Service testes', () => {
  describe('getAll sucess', () => {
    before(() => {
      sinon.stub(Product, 'findAll').returns(productsMock);
    });
    after(() => {
      Product.findAll.restore();
    });

    it('should return all products', async () => {
      const products = await productsServices.getAll();
      expect(products.code).to.be.equal(StatusCodes.OK);
      expect(products.message).to.be.deep.equal(productsMock);
    });
  });

  describe('getAll fail', () => {
    before(() => {
      sinon.stub(Product, 'findAll').rejects();
    });
    after(() => {
      Product.findAll.restore();
    });

    it('should return a error', async () => {
      const products = await productsServices.getAll();
      expect(products.code).to.be.equal(StatusCodes.INTERNAL_SERVER_ERROR);
    });
  });

  describe('getById sucess', () => {
    before(() => {
      sinon.stub(Product, 'findOne').returns(productsMock[0]);
    });
    after(() => {
      Product.findOne.restore();
    });

    it('should return a product', async () => {
      const product = await productsServices.getById(1);
      expect(product.code).to.be.equal(StatusCodes.OK);
      expect(product.message).to.be.deep.equal(productsMock[0]);
    });
  });

  describe('getById fail', () => {
    before(() => {
      sinon.stub(Product, 'findOne').rejects();
    });
    after(() => {
      Product.findOne.restore();
    });

    it('should return a error', async () => {
      const product = await productsServices.getById(1);
      expect(product.code).to.be.equal(StatusCodes.NOT_FOUND);
    });
  });
});
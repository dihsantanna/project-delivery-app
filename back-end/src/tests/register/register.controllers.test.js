const sinon = require('sinon');
const { expect } = require('chai');

const registerServices = require('../../api/services/register.services');
const createUser = require('../../api/controllers/register.controllers');
const { StatusCodes } = require('http-status-codes');
const Mock = require('./register.mock');

describe('Register Controllers tests', () => {
  describe('createUser sucess', () => {
    const response = {};
    const request = {};

    before(async () => {
      request.body = {
        name: "Matheus Henrique",
        email: "matheushg@gmail.com",
        password: 'onepiece',
      };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(registerServices, 'createUser').resolves(Mock.registerServiceMock);
    });
    after(() => {
      registerServices.createUser.restore();
    });

    it('should return code 201', async () => {
      const result = await createUser(request, response);
      console.log(result);
      expect(response.status.calledWith(StatusCodes.CREATED)).to.be.true;
    });
  });

  describe('createUser fail', () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(registerServices, 'createUser').resolves({ code: StatusCodes.INTERNAL_SERVER_ERROR });
    });
    after(() => {
      registerServices.createUser.restore();
    });

    it('should return a error', async () => {
      await createUser(request, response);
      expect(response.status.calledWith(StatusCodes.INTERNAL_SERVER_ERROR)).to.be.true;
    });
  });
});
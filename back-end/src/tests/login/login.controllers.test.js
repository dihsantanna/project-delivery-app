const sinon = require('sinon');
const { expect } = require('chai');

const loginService = require('../../api/services/login.services');
const login = require('../../api/controllers/login.controllers');
const { StatusCodes } = require('http-status-codes');
const Mock = require('./login.mock');

describe('Login Controllers tests', () => {
  describe('login sucess', () => {
    const response = {};
    const request = {};

    before(async () => {
      request.body = Mock.loginPayload;
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(loginService, 'login').resolves(Mock.loginServiceMock);
    });
    after(() => {
      loginService.login.restore();
    });

    it('should return a login', async () => {
      await login(request, response);
      expect(response.status.calledWith(StatusCodes.OK)).to.be.true;
    });
  });

  describe('login fail', () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(loginService, 'login').resolves({ code: StatusCodes.NOT_FOUND });
    });
    after(() => {
      loginService.login.restore();
    });

    it('should return a error', async () => {
      await login(request, response);
      expect(response.status.calledWith(StatusCodes.NOT_FOUND)).to.be.true;
    });
  });
});
process.env.NODE_ENV = 'test';
process.env.PORT = '9999';

var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
var server = require('../express');

chai.use(chaiHttp);

describe('GET /api/sessions', function () {
  it('should return all sessions', function (done) {
    chai.request(server)
      .get('/api/sessions')
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.lengthOf(3)
        done();
      });
  });

  it('should return a session given its code', function (done) {
    chai.request(server)
      .get('/api/sessions/AAA')
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.lengthOf(1)
        done();
      });
  });

  it('should return not found session', function (done) {
    chai.request(server)
      .get('/api/sessions/UNDEFINED')
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.lengthOf(0)
        done();
      });
  });
});
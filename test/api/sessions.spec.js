process.env.NODE_ENV = 'test';
process.env.PORT = '9999';

var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
var server = require('../../express');

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

  it('should return tracks of session by session code', function (done) {
    chai.request(server)
      .get('/api/sessions/AAA/tracks')
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.lengthOf(1)
        expect(res.body[0].tracks).to.have.lengthOf(3)
        done();
      });
  });

  it('should return a 400 error trying to add a track without correct body', function (done) {
    chai.request(server)
      .post('/api/sessions/AAA/tracks')
      .set('content-type', 'application/json')
      .send({ id: 0 })
      .end(function (err, res) {
        expect(res.status).to.equal(400)
        done();
      });
  });

  it('should return 201 when create with correct body', function (done) {
    chai.request(server)
      .post('/api/sessions/AAA/tracks')
      .set('content-type', 'application/json')
      .send({ id: 0, name: 'random' })
      .end(function (err, res) {
        expect(res.status).to.equal(201)
        done();
      });
  });
});
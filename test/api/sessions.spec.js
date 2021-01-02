process.env.NODE_ENV = 'test';
process.env.PORT = '9999';

const Knex = require('../../db/knex');
var server = require('../../express');

var chai = require('chai');
var expect = chai.expect;
chai.should()
chai.use(require('chai-things'));
var chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('GET /api/sessions', function () {

  before(async () => {
    console.log('Setting the database');
    await Knex.migrate.down().then(() => Knex.migrate.latest().then(() => Knex.seed.run()))
  })

  it('should return all sessions', function (done) {
    chai.request(server)
      .get('/api/sessions')
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.lengthOf(3)
        done();
      });
  });

  it('should create a session', function (done) {
    chai.request(server)
      .post('/api/sessions/DDD')
      .end(function (err, res) {
        expect(res.status).to.equal(201)
        Knex.select().where({ code: 'DDD' }).from('sessions')
          .then((s) => {
            expect(s).not.null
            done();
          })
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
        expect(res.status).to.equal(404)
        done();
      });
  });

  it('should return tracks of session by session code', function (done) {
    chai.request(server)
      .get('/api/sessions/AAA/tracks')
      .end(function (err, res) {
        expect(res.status).to.equal(200)
        expect(res.body).to.have.lengthOf(3)
        res.body.should.all.have.keys('votes', 'name', 'id')
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

  it('should return 204 and attach to session when create with correct body and track does not exist', function (done) {
    chai.request(server)
      .post('/api/sessions/AAA/tracks')
      .set('content-type', 'application/json')
      .send({ id: 'vrsdG3SDas13FhX', name: 'random' })
      .end(function (err, res) {
        expect(res.status).to.equal(201)
        Knex.select().from('sessions_tracks').then(
          (r) => {
            expect(r).have.lengthOf(4);
            done();
          }
        )
      });
  });

  it('should return 201 and increment a vote when create with correct body and track exist', function (done) {
    chai.request(server)
      .post('/api/sessions/AAA/tracks')
      .set('content-type', 'application/json')
      .send({ id: 'vrsdG3SDas13FhX', name: 'random' })
      .end(function (err, res) {
        expect(res.status).to.equal(204)
        Knex.select('votes').from('sessions_tracks').where({ track_id: 'vrsdG3SDas13FhX' })
          .then((r) => {
            expect(r[0].votes).equals(1);
            done();
          })
      });
  });

  it('should return 201 and increment a vote when vote a track', function (done) {
    chai.request(server)
      .post('/api/sessions/AAA/tracks/keAJT0e6DG/vote')
      .end(function (err, res) {
        expect(res.status).to.equal(204)
        Knex.select('votes').from('sessions_tracks').where({ track_id: 'keAJT0e6DG' })
          .then((r) => {
            expect(r[0].votes).equals(1);
            done();
          })
      });
  });

  // it('should return 204 when delete track from session', function (done) {
  //   chai.request(server)
  //     .delete('/api/sessions/AAA/tracks')
  //     .set('content-type', 'application/json')
  //     .end(function (err, res) {
  //       expect(res.status).to.equal(201)
  //       done();
  //     });
  // });
});
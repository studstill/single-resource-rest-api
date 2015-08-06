
var mongoose = require('mongoose');
var chai = require('chai');
var chaiHTTP = require('chai-http');
var expect = require('chai').expect;
var server = require('../server.js');
var User = require('../models/user-model');

process.env.MONGOLAB_URI = 'mongodb://localhost/users-test';
chai.use(chaiHTTP);

// Create variables for testing
var correctSchemaObj = {'username': 'jason123',
                        'email': 'jason123@email.com'};
var userId = '';

var incorrectSchemaObj = {'email': 'crazy_person123ATaol.com',
                          'favoriteActor': 'Tom Cruise'};

var propToUpdate = {email: 'newemail@newemail.com'};

describe('server', function() {

  after(function(done) {
    mongoose.connection.db.dropDatabase();
    mongoose.disconnect();
    done();
  });

/************************************************************
/   Handle GET requests
/************************************************************/

  it('Should respond to GET request to "/"', function(done) {
    chai.request('http://localhost:3000')
        .get('/')
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(typeof(res.body)).to.eql('object');
          done();
        });
  });

  it('Should respond to GET request to "/users"',
    function(done) {
      chai.request('http://localhost:3000')
        .get('/api/users')
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(typeof(res.body)).to.eql('object');
          done();
        });
  });

  /************************************************************
  /   Handle POST requests
  /************************************************************/

  it('Should respond to POST request to "/api/users"', function(done) {
    chai.request('http://localhost:3000')
      .post('/api/users')
      .send(correctSchemaObj)
      .then(function(res) {
        userId = res.body._id;
        expect(res.body.username).to.eql(correctSchemaObj.username);
        expect(res.body.email).to.eql(correctSchemaObj.email);
      });
    chai.request('http://localhost:3000')
      .post('/api/users')
      .send(incorrectSchemaObj)
      .then(function(res) {
        expect(res.body.err).to.not.eql(null);
        done();
      });
  });

  /************************************************************
  /   Handle PUT requests
  /************************************************************/

  it('Should respond to PUT request to "/api/users/id:"', function(done) {

    chai.request('http://localhost:3000')
      .put('/api/users/' + userId)
      .send(propToUpdate)
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.not.eql(undefined);
        expect(res.body.ok).to.eql(1);
      });
    // Input improperly formated email and expect err
    chai.request('http://localhost:3000')
      .put('/api/users/' + userId)
      .send({email: 'email.com'})
      .end(function(err, res) {
        expect(res.body.err).to.not.eql(null);
        done();
      });
  });

  /************************************************************
  /   Handle DELETE requests
  /************************************************************/

  it('Should respond to DELETE request to "/api/users/id:"', function(done) {
    chai.request('http://localhost:3000')
      .del('/api/users/' + userId)
      .end(function(err, res) {
      });

    // Do GET request for deleted user to make sure it is gone
    chai.request('http://localhost:3000')
      .get('/api/users/' + userId)
      .then(function(res) {
        // There SHOULD be an error
        expect(res.error).to.not.eql(null);
        done();
      });
  });

});

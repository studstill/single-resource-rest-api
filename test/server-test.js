var chai = require('chai');
var chaiHTTP = require('chai-http');
var expect = require('chai').expect;
var startServer = require('../server.js');

chai.use(chaiHTTP);

// ***** START SERVER FOR TESTING ******* //
startServer();

describe('server', function() {
  it('Should respond to a "/" GET request', function(done) {
    chai.request('http://localhost:3000')
        .get('/')
        .then(function(res) {
          expect(res).to.have.status(200);
          expect(typeof(res.body)).to.eql('object');
          done();
        });
  });
});

process.env.MONGO_URI = 'mongodb://localhost/unicorn_corral';
require('../server.js');
var chai = require('chai');
var chaihttp = require('chai-http');
var mongoose = require('mongoose');
chai.use(chaihttp);

var expect = chai.expect;

describe('the user api endpoints', function(){


  it('should create a new user', function (done) {
    chai.request('localhost:3000/api')
    .post('/create_user')
    .send({email: "test", password: "1234"})
    .end( function(err ,res){
      expect(err).to.eql(null);
      expect(res.body).to.have.property('token');
      done();
    });
  });

  it('should return a token on sign in', function(done){
    chai.request('localhost:3000/api')
    .post('/sign_in')
    //.send(' -u test:1234 ')
    .send({username:"test", password:"1234"})
    .end( function (err, res) {
      expect(err).to.eql(null);
      done();
    });
  });

});

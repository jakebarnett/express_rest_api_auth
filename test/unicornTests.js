process.env.MONGO_URI = 'mongodb://localhost/unicorn_corral_no_auth';
require('../server.js');
var chai = require('chai');
var chaihttp = require('chai-http');
var mongoose = require('mongoose');
chai.use(chaihttp);

var expect = chai.expect;

describe('unicorns api endpoints', function(){

	var token;
	before(function(done) {
		chai.request('localhost:3000/api')
		.post('/create_user')
		.send({email: "test@example.com" , password: "1234"})
		.end(function(err,res){
			token = res.body.token;
			done();
		});
	});

	it('should respond to a post request' , function(done){
		chai.request('localhost:3000/api')
			.post('/unicorns')
			.send({eat: token, unicornName: "Testy" , unicornAge: 1000})
			.end(function(err,res){
				expect(err).to.eql(null);
				expect(res.body).to.have.property('_id');
				expect(res.body.unicornName).to.eql('Testy');
				expect(res.body.unicornAge).to.eql(1000);
				done();
			});
	});

	it('should respond to a get request', function (done){
		chai.request('localhost:3000/api')
			.get('/unicorns')
			.send({eat: token})
			.end(function(err,res){
				expect(err).to.eql(null);
				expect(res.body[0].unicornName).to.eql('Testy');
				expect(res.body[0].unicornAge).to.eql(1000);
				done();
			});
	});

	after(function(done){
		mongoose.connection.db.dropDatabase(function(){
			done();
		});
	});
});

describe('the put and delete endpoints', function(){

	var token;
	before(function(done) {
		chai.request('localhost:3000/api')
		.post('/create_user')
		.send({email: "test@example.com" , password: "1234"})
		.end(function(err,res){
			token = res.body.token;
			done();
		});
	});

	var id;
	before(function(done) {
		chai.request('localhost:3000/api')
		.post('/unicorns')
		.send({eat: token, unicornName: "Testy" , unicornAge: "1000"})
		.end(function(err,res){
			id = res.body._id;
			done();
		});
	});

	it('should update and existing unicorn', function(done){
		chai.request('localhost:3000/api')
			.put('/unicorns/' + id)
			.send({eat: token, unicornAge: "5000"})
			.end(function(err,res){
				expect(err).to.eql(null);
				expect(res.body.unicornAge).to.eql('5000');
				done();
			});
	});

	it('should delete a unicorn', function(done){
		chai.request('localhost:3000/api')
		.delete('/unicorns/' + id)
		.send({eat: token})
		.end(function(err,res) {
			expect(err).to.eql(null);
			expect(res.body).to.eql('unicorn deleted');
			done();
		});
	});

	after(function(done){
		mongoose.connection.db.dropDatabase(function(){
			done();
		});
	});
});

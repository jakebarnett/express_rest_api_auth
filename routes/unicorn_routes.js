var Unicorn = require('../unicorn_models/unicorns');
var bodyparser = require('body-parser');
var eat_auth = require('../lib/eat_auth');

module.exports = function(app, appSecret) {

	app.use(bodyparser.json());

	app.get('/unicorns', eat_auth(appSecret), function (req, res){
		Unicorn.find({}, function (err, data){
			if (err) return res.status(500).send({'msg' : 'could not retreive unicorn'});
			res.json(data);
		});
	});

	app.post('/unicorns', eat_auth(appSecret), function(req, res){
		var newUnicorn = new Unicorn(req.body);
		newUnicorn.save(function(err, data){
			if (err) return res.status(500).send({'msg' : 'could not save unicorn'});
			res.json(data);
		});
	});

	app.put('/unicorns/:id', eat_auth(appSecret), function(req,res){
		var updatedUnicorn = req.body
		delete req.body._id;
		Unicorn.update({_id: req.params.id}, updatedUnicorn, function(err){
			if (err) return res.status(500).send({'msg' : 'could not save unicorn'});
			res.json(req.body);
		});
	});

	app.delete('/unicorns/:id', eat_auth(appSecret), function(req,res){
		Unicorn.remove({_id: req.params.id}, function(err){
			if (err) return res.status(500).send({'msg' : 'could not delete unicorn'});
			res.json('unicorn deleted');
		});
	});

}

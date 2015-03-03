var mongoose = require('mongoose');

var unicornSchema = new mongoose.Schema({
	unicornName : String,
	unicornAge : Number
});

module.exports = mongoose.model('Unicorn' , unicornSchema);

var mongoose = require('mongoose');
var express = require('express');
var unicornRoutes = require('./routes/unicorn_routes');
var userRoutes = require('./routes/user_routes');
var passport = require('passport');

mongoose.connect(process.env.MONG_URI || 'mongodb://localhost/unicorn_corral');

var app = express();
app.set('appSecret', process.env.SECRET || 'changethischangethis!' );
app.use(passport.initialize());
require('./lib/passport_strat')(passport)

var unicornRouter = express.Router();
var userRouter = express.Router();

unicornRoutes(unicornRouter, app.get('appSecret'));
userRoutes(userRouter, passport, app.get('appSecret'));

app.use('/api', unicornRouter);
app.use('/api', userRouter)

app.listen(process.env.PORT || 3000, function(){
	console.log("server listening");
});

require('dotenv').config();
var express = require('express');
var logger = require('morgan');
var models = require('./models');
var app = express();

app.use(logger('dev')) ;
var port = process.env.PORT || 8080;
app.use(require('./api'));

//sync database modles, then start server
models.sequelize.sync().then(function () {
	var server = app.listen(port, function () {
		console.log('Server', process.pid, 'listening on', port)
	});
});

var config = require('dotenv').config();
var express = require('express');
var logger = require('morgan');
var jwt = require('jwt-simple');
var sequelize = require('./databaseConfig');
var app = express();

app.use(logger('dev')) ;
var port = process.env.PORT || 8080;
app.use(require('./api'));
var server = app.listen(port, function () {
	console.log('Server', process.pid, 'listening on', port)
});

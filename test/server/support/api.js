var express = require('express');
var request = require('supertest');
var router = require(__dirname+'/../../../api');
var app = express();

app.use(router);
module.exports = request(app);

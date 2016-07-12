'use strict';

var express = require('express');
var api = express.Router();
var parser = require('body-parser');
var middleware = require(__dirname+'/middleware');
var adminMiddleware = require(__dirname+'/adminMiddleware');
var handler = require(__dirname+'/support/handler');


api.use(parser.json()); //body parser


/*******************************************************
* Public routes here
********************************************************/
api.post('/api/authenticate', handler.authenticate);

api.post('/api/users', handler.createUser);

/*******************************************************
* authenticated user routes here
********************************************************/
api.use('/api', middleware);

api.get('/api/users', handler.getAllUsers);

api.put('/api/users/:id', handler.updateUser);

api.get('/api/roles', handler.getUserRoles);

/*******************************************************
* Admin routes here
********************************************************/
api.use('/api', adminMiddleware);

api.delete('/api/users/:id', handler.deleteUser);

module.exports = api;

'use strict';

var express = require('express');
var api = express.Router();
var parser = require('body-parser');
var User = require(__dirname+'/../models/user');
var bcrypt = require('bcryptjs');

api.use(parser.json()); //body parser


/*******************************************************
* Define routes here
********************************************************/
api.post('/api/users', function(request, response){

    //firstName: 'John',
    //lastName: 'Hancock',
    //username: 'Lanesta',
    //password: 'password'

	var user = request.body;

	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(user.password, salt, function(err, hash) {
	        // Store hash in your password DB.
	        user.password = hash;

	        User.findOrCreate({where: {username: user.username}, defaults: user})
			.spread(function(user, created) {
		        console.log(user.get({plain: true}))
		        console.log(created)

		       //each user should have a unique username
		       if(created)
		       	 return response.sendStatus(201);
		   	   else
		   	   	 return response.sendStatus(403);

		     })
			.catch(function(error){
				return response.send(error);
			});
	    });
	});

});

api.post('/api/authenticate', function(request, response, next){

	var credentials = request.body;
  User.findOne({ where: {username: credentials.username} })
  .then(function(user) {
    //compare password to hash password in db
    bcrypt.compare(credentials.password, user.password, function(error, valid) {
      if (error) { return next(err) }
      if (!valid) { return response.send(401) }

      //var token = jwt.encode({username: user.username}, config.secret);
      //console.log(token);
      //res.json(token);
      response.sendStatus({success:true});
    });
  })
});

module.exports = api;

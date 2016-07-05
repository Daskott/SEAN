'use strict';

require('dotenv').config();
var express = require('express');
var api = express.Router();
var parser = require('body-parser');
var User = require(__dirname+'/../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var middleware = require(__dirname+'/middleware');

api.use(parser.json()); //body parser


/*******************************************************
* Define routes here
********************************************************/
api.post('/api/authenticate', function(request, response, next){

	var credentials = request.body;
  User.findOne({ where: {username: credentials.username} })
  .then(function(user) {

		if(!user)return response.status(401).send({success:false, message:'Authentication failed. User not found.'});
    //compare password to hash password in db
    bcrypt.compare(credentials.password, user.password, function(error, valid) {
      if (error) { return next(err) }
      if (!valid) { return response.status(401).send({success:false, message: 'Authentication failed. Wrong password.'}); }

			// console.log(user.dataValues);
			var token;

			if(credentials.rememberMe){
				token = jwt.sign(user.dataValues, process.env.API_SECRET, {
          expiresIn :'43200m' // expires in 30days
      	});
			}else{
				token = jwt.sign(user.dataValues, process.env.API_SECRET, {
          expiresIn :'1400m' // expires in 24hours
      	});
			}
      // return the information including token as JSON
      response.status(200).json({
        success: true,
        message: 'Authentication successful!',
				user:{
							id: user.id,
							roleId: user.roleId,
							firstName: user.firstName,
		    			lastName:  user.lastName,
		    			username:  user.username
		    			},
        token: token
      });

    });
  })
});

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
					user.role = 0; //normal user

      User.findOrCreate({where: {username: user.username}, defaults: user})
			.spread(function(user, created) {
		        console.log(user.get({plain: true}))
		        console.log(created)

		       //each user should have a unique username
		       if(created)
		       	 return response.status(201).send({success:true, message: 'User created!'});
		   	   else
		   	   	 return response.status(403)
						 								.send({success:false, message: 'A user already exist with the username "'+user.username+'"'});

		     })
			.catch(function(error){
				return response.send(error);
			});
	    });
	});

});

/*******************************************************
* middleware & routes that need authorization
********************************************************/
api.use('/api', middleware);

api.get('/api/users', function(request, response){
		User.findAll()
		.then(function(users){
				return response.json({success:true, users:users});
		})
		.catch(function(error){
			return response.send({success:false, message:error});
		});
});

api.delete('/api/users/:id', function(request, response){
		var userId = request.params.id;
		//console.log("dec: "+request.decoded.role);
		User.destroy({
		  where: {
		    id: userId
		  }
		})
		.then(function(rows){
				if(rows === 1)
					return response.json({success:true, message:"User with id '"+userId+"' deleted!"});
				else
					return response.json({success:false, message:"No row was affected! user with id ='"+userId+"' may not exist."});
		})
		.catch(function(error){
			return response.send({success:false, message:error});
		});
});

module.exports = api;

'use strict';

require('dotenv').config();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var models = require(__dirname+'/../../models');
var User = models.Users;
var Role = models.Roles;

/*******************************************************
* Public routes here
********************************************************/
var handler = {

  authenticate: function(request, response, next){

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
  			var expiresIn;

  			if(credentials.rememberMe){
  				token = jwt.sign(user.dataValues, process.env.API_SECRET, {
            expiresIn :'43200m' // expires in 30days
        	});
  			}else{
  				token = jwt.sign(user.dataValues, process.env.API_SECRET, {
            expiresIn :'1400m' // expires in 24hours
        	});
  			}

  			// verifies token and send
  	    jwt.verify(token, process.env.API_SECRET, function(err, decoded) {
  	      if (err) {
  	        return response.status(401).json({ success: false, message: 'Failed to authenticate token.' });
  	      } else {
  					expiresIn = decoded.exp;

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
  		        token: token,
  						expiresIn: expiresIn
  		      });
  	      }
  	    });
      });
    })
  },

  createUser: function(request, response){
  	var user = request.body;

  	bcrypt.genSalt(10, function(err, salt) {
  	    bcrypt.hash(user.password, salt, function(err, hash) {
  	        // Store hash in your password DB.
  	        user.password = hash;
  					user.role = 1; //normal user

        User.findOrCreate({where: {username: user.username}, defaults: user})
  			.spread(function(user, created) {

  		       //each user should have a unique username
  		       if(created)
  		       	 return response.status(201).send({success:true, message: 'User created!'});
  		   	   else
  		   	   	 return response.status(403)
  						 								.send({success:false, message: 'A user already exist with the username "'+user.username+'"'});

  		     })
  			.catch(function(error){
  				return response.status(400).send(error.message);
  			});
  	    });
  	});

  },

  getAllUsers: function(request, response){
  		User.findAll({attributes: { exclude: ['password'] }})
  		.then(function(users){
  				return response.status(200).json({success:true, users:users});
  		})
  		.catch(function(error){
  			return response.status(400).send({success:false, message:error.message});
  		});
  },

  updateUser: function(request, response){
  		var userId = request.params.id;
  		var userUpdate = request.body;

  		/*
  		* check user role
  		* if admin allow update
  		* if normal user, make sure he/she update's
  		* only their record [except their role]
  		*
  		*/
  		var userRoleId = request.decoded.roleId;
  		var currentUserId = request.decoded.id;
  		Role.findAll()
  		.then(function(roles){
  			var isRoleUpdate = userUpdate.roleId? true:false;

  			if(roles[userRoleId].name === 'Admin'
  					|| userId+'' === currentUserId+'' && !isRoleUpdate){
  				//update user record
  				User.find({
  				  where: {
  				    id: userId
  				  }
  				})
  				.then(function(user) {
  				  if (user) { // if the record exists in the db
  				    	User.update(
  									userUpdate
  								,
  								{
  									where: {id: userId}
  			  				})
  							.then(function(data) {
  									return response.status(200).json({success:true, message: 'User updated!'});
  							})
  							.catch(function(error){
  								return response.status(403).send({success:false, message:error.message});
  							});
  				  }
  				})
  				.catch(function(error){
  					return response.status(403).send({success:false, message:error.message});
  				});
  			}else {
  				return response.status(401).json({ success: false, message: 'You do not have Authorization.'});
  			}
  		})
  },

  getUserRoles: function(request, response){
  		Role.findAll()
  		.then(function(roles){
  				return response.json({success:true, roles:roles});
  		})
  		.catch(function(error){
  			return response.send({success:false, message:error.message});
  		});
  },

  deleteUser: function(request, response){
  		var userId = request.params.id;

  		User.destroy({
  		  where: {
  		    id: userId
  		  }
  		})
  		.then(function(rows){
  				if(rows === 1)
  					return response.status(200).json({success:true, message:"User with id '"+userId+"' deleted!"});
  				else
  					return response.status(200).json({success:false, message:"No row was affected! user with id ='"+userId+"' may not exist."});
  		})
  		.catch(function(error){
  			return response.status(401).send({success:false, message:error.message});
  		});
  }

}

module.exports = handler;

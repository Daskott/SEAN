var expect = require('chai').expect;
var api = require(__dirname+'/../support/api' );
var Users = require(__dirname+'/../../../models').user;
var User = require(__dirname+'/../../support/db/users');

/*****************************
* Global vars
******************************/
var newUser = {
  firstName:'Julie',
  lastName:'Lanna',
  username:'Mimi',
  password:'password',
  roleId: ''
}
var newUserCredentials = {
  token: '',
  userId:''
}

var adminUser = {
  firstName:'Eddy',
  lastName:'Daskott',
  username:'edd',
  password:'passwordd',
  roleId: ''
}
var adminUserCredentials = {
  token: '',
  userId:''
}

/*****************************
* Actual tests
******************************/
describe('api.users', function () {

  before(function(done) {
    //create admin account
    api.post('/api/users')
    .send(adminUser)
    .expect(201)
    .end(function(error, response) {
      if (error) return done(error);
      //make user admin
      var userModel = new User();
      userModel.makeUserAdmin(adminUser.username);
      done();
    });
  });


  //create user accout
	describe('POST /api/users', function () {

		it('should register user', function (done) {
			api.post('/api/users')
    	.send(newUser)
			.expect(201)
			.end(done);
		})
	})

  //authenticate user
	describe('POST /api/users', function () {

		it('should authenticate user', function (done) {
			api.post('/api/authenticate')
    	.send({
        username:newUser.username,
        password:newUser.password,
        rememberMe: false
      })
			.expect(200)
      .expect(function (response) {
				expect(response.body).to.have.property('token');

        //get user credentials
        newUserCredentials.token = response.body.token;
        newUserCredentials.userId = response.body.userId;
			}).end(done)
		})
	})

  //get all users
	describe('GET /api/users', function () {

		it('should get all users', function (done) {
			api.get('/api/users')
      .set('x-auth', newUserCredentials.token)
			.expect(200)
      .expect(function (response) {
				expect(response.body.length >= 1);
        expect(response.body).to.have.property('users');
			}).end(done)
		})
	})

  //get one user
	describe('GET /api/users', function () {

		it('should return one user', function (done) {
			api.get('/api/users/'+newUserCredentials.userId)
      .set('x-auth', newUserCredentials.token)
			.expect(200)
      .expect(function (response) {
        expect(response.body.user.firstName).to.equal(newUser.firstName);
			}).end(done)
		})
	})

  //update user record[username]
	describe('PUT /api/users/', function () {

		it('should update user record', function (done) {
			api.put('/api/users/'+newUserCredentials.userId)
      .set('x-auth', newUserCredentials.token)
      .send({
        firstName:"Jenni"
      })
			.expect(200)
      .expect(function (response) {
        expect(response.body).to.have.property('success');
        expect(response.body.success).to.equal(true);
			})
      .end(done);
		})
	})

  //delete user record[username]
	describe('DELETE /api/users/', function () {
    before(function(done){
      //get admin credentials
      api.post('/api/authenticate')
      .send({
        username:adminUser.username,
        password:adminUser.password,
        rememberMe: false
      })
      .expect(200)
      .expect(function (response) {
        expect(response.body).to.have.property('token');

        //get user credentials
        adminUserCredentials.token = response.body.token;
        adminUserCredentials.userId = response.body.userId;
      })
      .end(done);
    })

		it('should not be able to delete user record if not admin', function (done) {
			api.delete('/api/users/'+newUserCredentials.userId)
      .set('x-auth', newUserCredentials.token)
			.expect(401)
      .expect(function (response) {
        expect(response.body).to.have.property('success');
        expect(response.body.success).to.equal(false);
			})
      .end(done);
		})


    it('should be able to delete user record if admin', function (done) {
			api.delete('/api/users/'+newUserCredentials.userId)
      .set('x-auth', adminUserCredentials.token)
			.expect(200)
      .expect(function (response) {
        expect(response.body).to.have.property('success');
        expect(response.body.success).to.equal(true);
			})
      .end(done);
		})
	})

  after(function() {
    //delete admin account
    var userModel = new User();
    userModel.destroy(adminUser.username);
  });

})

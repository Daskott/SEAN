/******************************
* globals
*******************************/
var user1 = {
  firstName:'Julie',
  lastName:'Lanna',
  username:'Mimi',
  password:'password',
  roleId: 1
};
var user2 = {
  firstName:'Eddy',
  lastName:'Daskott',
  username:'edd',
  password:'passwordd',
  roleId: 1
};

/******************************
* Actual tests
*******************************/

describe('userService', function () {
	beforeEach(module('app'));

	var UserService, $httpBackend;

	beforeEach(inject(function (_UserService_, _$httpBackend_) {
		UserService = _UserService_ ;
		$httpBackend = _$httpBackend_ ;
	}));

	afterEach(function () {
		$httpBackend.flush();
	});

	describe('#GET ALL USERS', function () {
		beforeEach(function () {
			//setup backend: angular does not allow http calls outside of test suite
			$httpBackend
			.expectGET('/api/users')
			.respond([user1,user2]);
		});

		it('should return 2 users', function () {
      expect(UserService.getAllUsers).to.exist;
			UserService.getAllUsers().then(function (users) {
				expect(users).to.have.length(2)
			});
		});
	})

  describe('#REGISTER', function () {
		beforeEach(function () {
			//setup backend: angular does not allow http calls outside of test suite
      $httpBackend
      .expectPOST('/api/users', user1)
      .respond(201, 'created');
		});

		it('should register user', function () {
      expect(UserService.register).to.exist;
			UserService.register(user1).then(function (response) {
				expect(response).to.equal('created')
			});
		});
	})

  describe('#UPDATE USER', function () {
		beforeEach(function () {
			//setup backend: angular does not allow http calls outside of test suite
      $httpBackend
      .expectPUT('/api/users/1', {firstName:"Eddy"})
      .respond(200, 'updated');
		});

		it('should update user', function () {
      expect(UserService.updateUser).to.exist;
			UserService.updateUser(1, {firstName:"Eddy"}).then(function (response) {
				expect(response).to.equal('updated')
			});
		});
	})

  describe('#LOGIN USER', function () {
		beforeEach(function () {
			//setup backend: angular does not allow http calls outside of test suite
      $httpBackend
      .expectPOST('/api/authenticate', {username:"eddy", password:"password"})
      .respond(200, 'authenticated');
		});

		it('should send login credentials', function () {
      expect(UserService.login).to.exist;
			UserService.login({username:"eddy", password:"password"}).then(function (response) {
				expect(response).to.equal('authenticated')
			});
		});
	})

  describe('#DELETE USER', function () {
		beforeEach(function () {
			//setup backend: angular does not allow http calls outside of test suite
      $httpBackend
      .expectDELETE('/api/users/1')
      .respond(200, 'deleted');
		});

		it('should send delete request', function () {
      expect(UserService.delete).to.exist;
			UserService.delete(1).then(function (response) {
				expect(response).to.equal('deleted')
			});
		});
	})

  describe('#GET USER ROLES', function () {
		beforeEach(function () {
			//setup backend: angular does not allow http calls outside of test suite
      $httpBackend
      .expectGET('/api/roles')
      .respond(200, 'roles');
		});

		it('should make proper request for all user roles', function () {
      expect(UserService.getUserRoles).to.exist;
			UserService.getUserRoles().then(function (response) {
				expect(response).to.equal('roles')
			});
		});
	})
})

//just define module & its dependencies
var app = angular.module('app', [
  'ngRoute',
  'ngAnimate',
  'ngCookies',
  'ngFlash'
  // 'ngSanitize',
  // 'ngTagsInput',
  // 'firebase'
]);


(function () {
    'use strict';

    angular
        .module('app')
        .config(config)

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
          .when('/', { controller: 'LoginCtrl', templateUrl: 'login.html' })
          .when('/register', { controller: 'RegisterCtrl', templateUrl: 'register.html' })
          .when('/home', { controller: 'HomeCtrl', templateUrl: 'home.html' })
          .otherwise({ redirectTo: '/' });
    }

})();

angular.module('app')
.controller('ApplicationCtrl', function ($scope, $rootScope) {

  //when user logs in, receive signal on login
  $scope.$on('login', function () {
    $scope.currentUser = $rootScope.globals.currentUser.data;
  });

 });

angular.module('app')
.controller('HomeCtrl', function ($scope, $rootScope, $location, UserService) {

  UserService.getAllUsers()
  .then(function(response){
    $scope.users = response.users;
  })
  $scope.logout = function () {
    UserService.clearCredentials();
    //go back to sigin page
    $location.path('/');
    $scope.currentUser = null;
  }

 });

angular.module('app')
.controller('LoginCtrl', function ($scope, $rootScope, $location, Flash, UserService) {

	$scope.login = function(username, password) {
    	//console.log(username, password);
   		$scope.dataLoading = true;
			if(!username || !password)return;

    	UserService.login({username:username, password:password})
	    .then(function (response) {
				console.log(response);
            if (response.success) {
              $scope.successAlert();
							UserService.clearCredentials();
						 	UserService.setCredentials(response.user, response.token);
							$scope.$emit('login');
              console.log("Your in");
              $location.path('/home');
            } else {
              $scope.failureAlert();
              console.log("Nope!");
              $scope.dataLoading = false;
            }
        });
  }

	$scope.successAlert = function () {
      var message = '<strong> Well done!</strong>  You successfully read this important alert message.';
      var id = Flash.create('success', message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
			// First argument (string) is the type of the flash alert.
    	// Second argument (string) is the message displays in the flash alert (HTML is ok).
    	// Third argument (number, optional) is the duration of showing the flash. 0 to not automatically hide flash (user needs to click the cross on top-right corner).
    	// Fourth argument (object, optional) is the custom class and id to be added for the flash message created.
    	// Fifth argument (boolean, optional) is the visibility of close button for this flash.
    	// Returns the unique id of flash message that can be used to call Flash.dismiss(id); to dismiss the flash message.
	}

	$scope.failureAlert = function () {
      var message = '<strong> OOps!</strong>  Failed to login.';
      var id = Flash.create('danger', message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
	}

 });

var app = angular.module('app');
app.controller('RegisterCtrl', function ($scope, $location, UserService) {

  $scope.register = function(firstName, lastName, username, password) {
    console.log(firstName, lastName, username, password);

    //if(firstName && lastName && username && password){
 	   	$scope.dataLoading = true;

    	var user = {
    		 firstName: firstName,
    		 lastName: lastName,
    		 username: username,
    		 password: password
    	}

    	UserService.register(user)
	    .then(function (response) {
            if (response.success) {
                //FlashService.Success('Registration successful', true);
                $location.path('/');
            } else {
                //FlashService.Error(response.message);
                $scope.dataLoading = false;
            }
        });
    //}
  }
});

var app = angular.module('app');
 app.service('UserService', function ($http, $rootScope, $cookieStore) {
   var svc = this;

   svc.getAllUsers = function () {
     return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
   }

   svc.register = function (user) {
     return $http.post('/api/users', user).then(handleSuccess, handleError('Error creating user'));
   }

    svc.login = function (credentials) {
     return $http.post('/api/authenticate', credentials).then(handleSuccess, handleError('Error login in user'));
   }

   svc.setCredentials = function(user, token){
    var authdata = token;
    $rootScope.globals = {
          currentUser: {
              data: user,
              authdata: authdata
          }
      };

    //set token for all request
    $cookieStore.put('globals', $rootScope.globals);
    $http.defaults.headers.common['x-auth'] = authdata;

  }

  //clearCredentials
  svc.clearCredentials  = function () {
      $rootScope.globals = {};
      $cookieStore.remove('globals');
      $http.defaults.headers.common.Authorization = null;
  }


 });

// private functions

function handleSuccess(response) {
    //console.log(response.data);
    return response.data;
}

function handleError(error) {
    return function () {
        return { success: false, message: error };
    };
}

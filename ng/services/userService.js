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

   svc.delete = function (userId) {
    return $http.delete('/api/users/'+userId).then(handleSuccess, handleError('Error login in user'));
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

var app = angular.module('app');
 app.service('UserService', function ($http) {
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

   //TODO: clear credentials

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

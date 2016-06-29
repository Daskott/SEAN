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

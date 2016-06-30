angular.module('app')
.controller('HomeCtrl', function ($scope, $rootScope, $location, UserService) {

  //get all usres
  UserService.getAllUsers().then(function(response){
    $scope.users = response.users;
  })

  $scope.delete = function (userId) {
    //delete user
    UserService.delete(userId);

    //refresh list
    UserService.getAllUsers().then(function(response){
      $scope.users = response.users;
    })

  }

  $scope.logout = function () {
    UserService.clearCredentials();
    //go back to sigin page
    $location.path('/');
    $scope.currentUser = null;
  }

 });

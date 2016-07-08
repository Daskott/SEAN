angular.module('app')
.controller('ApplicationCtrl', function ($scope, $rootScope, $location, UserService) {

  //when user refreshes page, mk sure use is set
  $scope.currentUser = $rootScope.globals.currentUser? $rootScope.globals.currentUser.data : {};

  //when user logs in, receive signal on login
  $scope.$on('login', function () {
    $scope.currentUser = $rootScope.globals.currentUser.data;
  });

  //when logout signal is emitted, handle it here
  $rootScope.$on('logout', function () {
    $scope.logout();
  });

  //get all user roles
  UserService.getUserRoles().then(function(response){
    if(response.roles){
      $scope.roles = response.roles;
    }else{
      $scope.roles = [];
      console.log(response.message);
    }
  });
  
  $scope.logout = function () {
    UserService.clearCredentials();
    //go back to sigin page
    $location.path('/');
    $scope.currentUser = null;
  }

 });

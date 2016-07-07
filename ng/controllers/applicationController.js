angular.module('app')
.controller('ApplicationCtrl', function ($scope, $rootScope, UserService) {

  //when user refreshes page, mk sure use is set
  $scope.currentUser = $rootScope.globals.currentUser? $rootScope.globals.currentUser.data : {};

  //when user logs in, receive signal on login
  $scope.$on('login', function () {
    $scope.currentUser = $rootScope.globals.currentUser.data;
  });

 });

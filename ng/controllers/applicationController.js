angular.module('app')
.controller('ApplicationCtrl', function ($scope, $rootScope) {

  //when user logs in, receive signal on login
  $scope.$on('login', function () {
    $scope.currentUser = $rootScope.globals.currentUser.data;
  });

 });

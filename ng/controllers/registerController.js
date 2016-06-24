var app = angular.module('app');
app.controller('RegisterCtrl', function ($scope, $location) {

  $scope.register = function(firstName, lastName, username, password) {
    console.log(firstName, lastName, username, password);
  }
});

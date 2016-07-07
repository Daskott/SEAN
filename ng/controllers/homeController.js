angular.module('app')
.controller('HomeCtrl', function ($scope, $rootScope, $location, UserService, FlashService) {

  //get all user roles
  UserService.getUserRoles().then(function(response){
    $scope.roles = response.roles;
  });

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

  $scope.updateUserRole = function (user, role) {

    $scope.dataLoading = true;

    //set user role
    for(var i = 0; i < $scope.roles.length; i++){
      if($scope.roles[i].name === role){
        user.roleId = i;
        break;
      }
    }

    //role update
    var role = {
        roleId:user.roleId
    }

    //save new role
    UserService.updateUser(user.id, role)
    .then(function(response){
      if (response.success) {
        FlashService.successAlert(user.username+"'s role has been updated!");
      } else {
        FlashService.failureAlert(response.message);
      }
    });
  }

  $scope.logout = function () {
    UserService.clearCredentials();
    //go back to sigin page
    $location.path('/');
    $scope.currentUser = null;
  }

 });

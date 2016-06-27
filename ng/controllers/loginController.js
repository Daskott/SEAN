angular.module('app')
.controller('LoginCtrl', function ($scope, $rootScope, UserService) {
	
	$scope.login = function(username, password) {
    	console.log(username, password);
   		$scope.dataLoading = true;

    	UserService.login({username:username, password:password})
	    .then(function (response) {
            if (response.success) {
                //FlashService.Success('Registration successful', true);
                console.log("Your in");
                $location.path('/');
            } else {
                //FlashService.Error(response.message);
                console.log("Nope!");
                $scope.dataLoading = false;
            }
        });
  }
 });

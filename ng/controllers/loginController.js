angular.module('app')
.controller('LoginCtrl', function ($scope, $rootScope, UserService) {

	$scope.login = function(username, password) {
    	console.log(username, password);
   		$scope.dataLoading = true;

    	UserService.login({username:username, password:password})
	    .then(function (response) {
            if (response) {
                //FlashService.Success('Registration successful', true);
								//setcredentials
                console.log("Your in");
                $location.path('/home');
            } else {
                //FlashService.Error(response.message);
                console.log("Nope!");
                $scope.dataLoading = false;
            }
        });
  }
 });

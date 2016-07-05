angular.module('app')
.controller('LoginCtrl', function ($scope, $rootScope, $location, FlashService, UserService) {

	$scope.login = function(username, password, remember) {

			var rememberMe = remember || false;
			if(!username || !password)return;

			$scope.dataLoading = true;

    	UserService.login({username:username, password:password, rememberMe:rememberMe})
	    .then(function (response) {
				console.log(response);
            if (response.success) {
							UserService.clearCredentials();
						 	UserService.setCredentials(response.user, response.token);
							$scope.$emit('login');
              $location.path('/home');
            } else {
              FlashService.failureAlert("Your username or password is incorrect.");
              $scope.dataLoading = false;
            }
        });
  }

 });

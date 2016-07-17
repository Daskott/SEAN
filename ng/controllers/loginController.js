angular.module('app')
.controller('LoginCtrl', function ($scope, $rootScope, $location, FlashService, UserService) {

	$scope.login = function(username, password, remember) {

			var rememberMe = remember || false;
			if(!username || !password)return;

			$scope.dataLoading = true;

    	UserService.login({username:username, password:password, rememberMe:rememberMe})
	    .then(function (response) {
				console.log(response.expiresIn);
            if (response.success) {
							UserService.clearCredentials();

							//get user record & set credentials
							UserService.getUser(response.userId, response.token)
							.then(function(data){
								UserService.setCredentials(data.user, response.token, response.expiresIn);
								$scope.$emit('login');
	              $location.path('/home');
							})
							.catch(function(error){
				  			console.log(error.message);
				  		});
            } else {
              FlashService.failureAlert("Your username or password is incorrect.");
              $scope.dataLoading = false;
            }
        });
  }

 });

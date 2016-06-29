angular.module('app')
.controller('LoginCtrl', function ($scope, $rootScope, $location, Flash, UserService) {

	$scope.login = function(username, password) {
    	//console.log(username, password);
   		$scope.dataLoading = true;
			if(!username || !password)return;

    	UserService.login({username:username, password:password})
	    .then(function (response) {
				console.log(response);
            if (response.success) {
              $scope.successAlert();
							UserService.clearCredentials();
						 	UserService.setCredentials(response.user, response.token);
							$scope.$emit('login');
              console.log("Your in");
              $location.path('/home');
            } else {
              $scope.failureAlert();
              console.log("Nope!");
              $scope.dataLoading = false;
            }
        });
  }

	$scope.successAlert = function () {
      var message = '<strong> Well done!</strong>  You successfully read this important alert message.';
      var id = Flash.create('success', message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
			// First argument (string) is the type of the flash alert.
    	// Second argument (string) is the message displays in the flash alert (HTML is ok).
    	// Third argument (number, optional) is the duration of showing the flash. 0 to not automatically hide flash (user needs to click the cross on top-right corner).
    	// Fourth argument (object, optional) is the custom class and id to be added for the flash message created.
    	// Fifth argument (boolean, optional) is the visibility of close button for this flash.
    	// Returns the unique id of flash message that can be used to call Flash.dismiss(id); to dismiss the flash message.
	}

	$scope.failureAlert = function () {
      var message = '<strong> OOps!</strong>  Failed to login.';
      var id = Flash.create('danger', message, 5000, {class: 'custom-class', id: 'custom-id'}, true);
	}

 });

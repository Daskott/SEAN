var app = angular.module('app');
app.controller('RegisterCtrl', function ($scope, $location, UserService) {

  $scope.register = function(firstName, lastName, username, password) {
    console.log(firstName, lastName, username, password);

    //if(firstName && lastName && username && password){
 	   	$scope.dataLoading = true;

    	var user = {
    		 firstName: firstName,
    		 lastName: lastName,
    		 username: username,
    		 password: password
    	}

    	UserService.register(user)
	    .then(function (response) {
            if (response.success) {
                //FlashService.Success('Registration successful', true);
                $location.path('/');
            } else {
                //FlashService.Error(response.message);
                $scope.dataLoading = false;
            }
        });
    //}
  }
});

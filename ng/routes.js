
(function () {
    'use strict';

    angular
        .module('app')
        .config(config)

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
          .when('/', { controller: 'LoginCtrl', templateUrl: 'login.html' })
          .when('/register', { controller: 'RegisterCtrl', templateUrl: 'register.html' })
          .when('/home', { controller: 'HomeCtrl', templateUrl: 'home.html' })
          .otherwise({ redirectTo: '/' });
    }

})();

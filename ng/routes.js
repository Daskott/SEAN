
(function () {
    'use strict';

    angular
        .module('app')
        .config(config)
        .run(run)

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider,$rootScope) {
        $routeProvider
        .when('/login', { controller: 'LoginCtrl', templateUrl: 'login.html' })
        .when('/register', { controller: 'RegisterCtrl', templateUrl: 'register.html' })
        .when('/home',{ controller: 'HomeCtrl', templateUrl: 'home.html' })
        .otherwise({ redirectTo: '/login' });

        // configure html5 to get links working
        // If you don't do this, you URLs will be base.com/#/home rather than base.com/home
        $locationProvider.html5Mode(true);
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
    function run($rootScope, $location, $cookieStore, $http) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['x-auth'] = $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/', '/login', '/register']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }

            // redirect to home page if logged in and trying to access login page
            if (loggedIn && $location.path() === '/login') {
                $location.path('/home');
            }

        });
    }
})();

angular.module('app')
.directive('regularHomeView', function () {
  return {
    restrict: 'E',
    templateUrl: 'regularUser/home.html',
    controller: function ($scope, $css) {
      $css.bind('regularUser/app.css', $scope);
    }
  }
})
.directive('adminHomeView', function () {
  return {
    restrict: 'E',
    templateUrl: 'admin/home.html',
    controller: function ($scope, $css) {
      $css.bind('admin/app.css', $scope);
    }
  }
});

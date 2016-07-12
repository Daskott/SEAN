/**
* if you like, you can specify different css
* for each directive, using this option;
* e.g
*   controller: function ($scope, $css) {
*    $css.bind('/app.css', $scope);
*   }
*/

angular.module('app')
.directive('regularHomeView', function () {
  return {
    restrict: 'E',
    templateUrl: 'regularUser/home.html'
  }
})
.directive('adminHomeView', function () {
  return {
    restrict: 'E',
    templateUrl: 'admin/home.html'
  }
});

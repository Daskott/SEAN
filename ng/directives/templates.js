angular.module('app')
.directive('regularHomeView', function () {
  return {
    restrict: 'E',
    templateUrl: 'regularUser/home.html'
    //css: 'my-directive/my-directive.css'
  }
})
.directive('adminHomeView', function () {
  return {
    restrict: 'E',
    templateUrl: 'admin/home.html'
    //css: 'my-directive/my-directive.css'
  }
});

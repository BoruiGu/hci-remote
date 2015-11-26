var app = angular.module("UCBApp", ['ngRoute', 'ngTouch', 'ngAnimate']);

app.config(['$routeProvider',
function ($routeProvider) {
    $routeProvider.
	  when('/home', {
	      templateUrl: 'partial/home/home.html',
	      controller: 'HomeCtrl'
	  }).
	  when('/login', {
	      templateUrl: 'partial/login/login.html',
	      controller: 'LoginCtrl'
	  }).
      when('/myevent', {
          templateUrl: 'partial/my_event/my_event.html',
          controller: 'MyEventCtrl'
      }).
      otherwise({
          redirectTo: '/login'
      });
}]);
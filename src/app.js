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
      when('/my/event', {
          templateUrl: 'partial/my_event/my_event.html',
          controller: 'MyEventCtrl'
      }).
      when('/my/level', {
          templateUrl: 'partial/my_level/my_level.html',
          controller: 'MyLevelCtrl'
      }).
      when('/event/details/:id', {
          templateUrl: 'partial/event_details/event_details.html',
          controller: 'EventDetailsCtrl'
      }).
      when('/event/ucb/', {
          templateUrl: 'partial/ucb_event/ucb_event.html',
          controller: 'UCBEventCtrl'
      }).
      when('/event/member/', {
          templateUrl: 'partial/member_event/member_event.html',
          controller: 'MemberEventCtrl'
      }).
      when('/event/create', {
          templateUrl: 'partial/create_event/create_event.html'//,
          //controller: 'MyEventCtrl'
      }).
      otherwise({
          redirectTo: '/login'
      });
}]);
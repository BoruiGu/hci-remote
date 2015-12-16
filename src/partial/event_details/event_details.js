app.controller("EventDetailsCtrl", function ($scope, $routeParams, Event, PopUp) {
    Event.eventDetails($routeParams.id, function (response) {
        $scope.event = response;
    });
	
	PopUp.popup("this page is under construction");
});
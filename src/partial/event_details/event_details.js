app.controller("EventDetailsCtrl", function ($scope, $routeParams, Event) {
    Event.eventDetails($routeParams.id, function (response) {
        $scope.event = response;
    });
});
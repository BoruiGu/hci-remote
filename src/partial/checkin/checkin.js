app.controller("CheckInCtrl", function ($scope, $rootScope, $location, PopUp, Event) {   
    $scope.popup = function (msg) {
        PopUp.popup(msg);
    };

    Event.allEvent(function (response) {
        $scope.events = response;
    });

    $scope.isFirstEventInNewDate = function (idx) {
        return Event.isFirstEventInNewDate(idx, $scope.events, Event.isPastEvent);
    }

    $scope.isPastEvent = Event.isPastEvent;
});
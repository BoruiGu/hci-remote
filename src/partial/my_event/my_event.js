app.controller("MyEventCtrl", function ($scope, $rootScope, PopUp, Event) {   
    $scope.popup = function (msg) {
        PopUp.popup(msg);
    };

    $scope.username = $rootScope.username;
    Event.eventCreatedByUser($scope.username, function (response) {
        $scope.user_created_events = response;
        for (var i in $scope.user_created_events) {
            Event.rsvpInfo($scope.user_created_events[i].id, function (info) {
                $scope.user_created_events[i]['msg'] = info;
            });
        }
    });
});
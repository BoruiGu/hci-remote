app.controller("MyEventCtrl", function ($scope, $rootScope, $location, PopUp, Event) {   
    $scope.popup = function (msg) {
        PopUp.popup(msg);
    };

    $scope.username = $rootScope.username;
    function getCreatedEventInfo() {
        Event.eventCreatedByUserDesc($scope.username, function (response) {
            $scope.user_created_events = response;
            for (var i in $scope.user_created_events) {
                Event.eventRsvpInfo(i, $scope.user_created_events[i].id, function (idx, info) {
                    $scope.user_created_events[idx]['msg'] = info;
                });
            }
        });
    }
    getCreatedEventInfo();

    $scope.isFirstEventInNewDate = function (idx) {
        return Event.isFirstEventInNewDate(idx, $scope.user_created_events, null);
    }

    $scope.gotoCreateEvent = function () {
        $location.path('/event/create');
    };

    id_cancel = -1;

    $scope.setIdCancel = function (id) {
        id_cancel = id;
    };

    $scope.cancelEvent = function () {
        Event.cancel(id_cancel, function (response) {
            getCreatedEventInfo();
        });
    };
});
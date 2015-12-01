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

    $scope.isFirstEventInNewDate = function (idx) {
        if (idx == 0) {
            return true;
        }

        var prev_date_obj = new Date($scope.user_created_events[idx - 1].st_time);
        var curr_date_obj = new Date($scope.user_created_events[idx].st_time);
        return (prev_date_obj.getDate() != curr_date_obj.getDate())
               || (prev_date_obj.getMonth() != curr_date_obj.getMonth())
               || (prev_date_obj.getYear() != curr_date_obj.getYear());
    };
});
app.controller("CheckInCtrl", function ($scope, $rootScope, $location, PopUp, Event) {   
    $scope.popup = function (msg) {
        PopUp.popup(msg);
    };

    Event.eventCreatedByUser("UCB", function (response) {
        $scope.events = response;
        Event.eventCreatedByMember(function (response) {
            $scope.events = $scope.events.concat(response);
        });
    });

    $scope.isFirstEventInNewDate = function (idx) {
        if (idx == 0) {
            return true;
        }

        var prev_date_obj = new Date($scope.events[idx - 1].st_time);
        var curr_date_obj = new Date($scope.events[idx].st_time);
        return (prev_date_obj.getDate() != curr_date_obj.getDate())
               || (prev_date_obj.getMonth() != curr_date_obj.getMonth())
               || (prev_date_obj.getYear() != curr_date_obj.getYear());
    };
});
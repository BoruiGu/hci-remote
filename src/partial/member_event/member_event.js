app.controller("MemberEventCtrl", function ($scope, $rootScope, PopUp, Event, User) {
    $scope.username = $rootScope.username;
    var rsvped_event = [];
    $scope.popup = function (msg) {
        PopUp.popup(msg);
    };

    Event.eventCreatedByMember(function (response) {
        $scope.events = response;
        getUserRsvpInfo();
    });

    function contains(id, rsvped_event) {
        for (var idx in rsvped_event) {
            if (rsvped_event[idx].event_id == id) {
                return true;
            }
        }
        return false;
    }

    function getUserRsvpInfo() {
        $scope.rsvpinfo = [];
        User.userRsvpInfo($rootScope.username, function (response) {
            rsvped_event = response;
            for (var idx in $scope.events) {
                if (contains($scope.events[idx].id, rsvped_event)) {
                    $scope.rsvpinfo.push(true);
                } else {
                    $scope.rsvpinfo.push(false);
                }
            }
        });
    }    

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

    $scope.rsvp = function (event_id, comment) {
        var rsvp_info = {
            event_id: event_id,
            username: $rootScope.username,
            message: comment
        }
        Event.rsvp(rsvp_info, function (response) {
            getUserRsvpInfo();
        });
    };
});
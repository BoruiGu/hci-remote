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
            for (var idx in $scope.filteredEvents) {
                if (contains($scope.filteredEvents[idx].id, rsvped_event)) {
                    $scope.rsvpinfo.push(true);
                } else {
                    $scope.rsvpinfo.push(false);
                }
            }
        });
    }    

    $scope.isFirstEventInNewDate = function (idx) {
        return Event.isFirstEventInNewDate(idx, $scope.events, Event.isFutureEvent);
    }

    $scope.rsvp = function (event_id, comment, phone) {
        var rsvp_info = {
            event_id: event_id,
            username: $rootScope.username,
            message: phone ? comment + '; My Phone #: ' + phone : comment
        }
        Event.rsvp(rsvp_info, function (response) {
            getUserRsvpInfo();
        });
    };

    $scope.cancelRsvp = function (event_id) {
        var yes = confirm("Do you really want to cancel RSVP?");
        if (yes) {
            var rsvp_info = {
                event_id: event_id,
                username: $rootScope.username
            }
            Event.cancelRsvp(rsvp_info, function (response) {
                getUserRsvpInfo();
            });
        };
    };

    $scope.isFutureEvent = Event.isFutureEvent;
});
app.controller("CreateEventCtrl", function ($scope, Event, $location, $rootScope) {
    //ref: http://stackoverflow.com/questions/2998784/how-to-output-integers-with-leading-zeros-in-javascript
    function pad(num, size) {
        var s = "0000" + num;
        return s.substr(s.length - size);
    }

    function getDateTimeStr(t) {
        year = t.getFullYear();
        month = pad(t.getMonth() + 1, 2);
        day = pad(t.getDate(), 2);
        hh = pad(t.getHours(), 2);
        mm = pad(t.getMinutes(), 2);
        ss = '00';
        // MySQL DateTime: YYYY-MM-DD HH:mm:SS
        return year + '-' + month + '-' + day + ' ' + hh + ':' + mm + ':' + ss;
    }

    $scope.createEvent = function (e) {
        st_obj = new Date(e.st_time);
        ed_obj = new Date(e.ed_time);
        st_str = getDateTimeStr(st_obj);
        ed_str = getDateTimeStr(ed_obj);
        var event_info = {
            title: e.title,
            st_time: st_str,
            ed_time: ed_str,
            location: e.location,
            description: e.description,
            min_num_attendee: e.min_num_attendee,
            num_pts_per_hour: e.num_pts_per_hour,
            creator: $rootScope.username,
            nearest_stop: "Park Street - Red Line"
        };
        Event.create(event_info, function (response) {            
            // $location.path('/my/event');
            $scope.event = {};
        });
    };

    $scope.gotoMyEvent = function () {
        $location.path('/my/event');
    };
});
app.factory('Event', function ($http) {
    return {
        eventCreatedByUser: function (username, callback) {
            $http.get("/api/event/bycreator/" + username)
            .success(function (response) {
                callback(response);
            });
        },

        eventRsvpInfo: function (event_id, callback) {
            $http.get("/api/rsvp/byid/" + event_id)
            .success(function (response) {
                callback(response);
            });
        },

        eventDetails: function (id, callback) {
            $http.get("/api/event/byid/" + id)
            .success(function (response) {
                callback(response);
            });
        },

        rsvp: function (rsvp_info, callback) {
            $http.post("/api/rsvp/", rsvp_info)
            .success(function (response) {
                callback(response);
            });
        }
    };
});
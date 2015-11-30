app.factory('Event', function ($http) {
    return {
        eventCreatedByUser: function (username, callback) {
            $http.get("/api/event/bycreator/" + username)
            .success(function (response) {
                callback(response);
            });
        },

        rsvpInfo: function (event_id, callback) {
            $http.get("/api/rsvp/" + event_id)
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
    };
});
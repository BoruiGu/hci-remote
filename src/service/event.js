app.factory('Event', function ($http) {
    return {
        eventCreatedByUser: function (username, callback) {
            $http.get("/api/event/bycreator/" + username)
            .success(function (response) {
                callback(response);
            });
        },
        /* events created by any user except "UCB" */
        eventCreatedByMember: function (callback) {
            $http.get("/api/event/bymember/")
            .success(function (response) {
                callback(response);
            });
        },

        eventRsvpInfo: function (idx, event_id, callback) {
            $http.get("/api/rsvp/byid/" + event_id)
            .success(function (response) {
                callback(idx, response);
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
        },

        cancelRsvp: function (rsvp_info, callback) {
            $http.delete("/api/rsvp/" 
                         + rsvp_info.event_id 
                         + '/' + rsvp_info.username)
            .success(function (response) {
                callback(response);
            });
        }
    };
});
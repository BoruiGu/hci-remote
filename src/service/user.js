app.factory('User', function ($http) {
    return {
        userRsvpInfo: function (username, callback) {
            $http.get('api/rsvp/byusername/' + username)
            .success(function (response) {
                callback(response);
            });
        }
    };
});
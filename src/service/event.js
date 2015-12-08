app.factory('Event', function ($http) {
    return {
        create: function(event_info, callback) {
            $http.post("/api/event/create", event_info)
            .success(function (response) {
                callback(response);
            });
        },
        cancel: function(id, callback) {
            $http.delete("/api/event/" + id)
            .success(function (response) {
                callback(response);
            });
        },
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
        eventCreatedByUserDesc: function (username, callback) {
            $http.get("/api/event/desc/bycreator/" + username)
            .success(function (response) {
                callback(response);
            });
        },
        /* events created by any user except "UCB" */
        eventCreatedByMemberDesc: function (callback) {
            $http.get("/api/event/desc/bymember/")
            .success(function (response) {
                callback(response);
            });
        },
        allEvent: function (callback) {
            $http.get("/api/event/all/")
            .success(function (response) {
                callback(response);
            });
        },
        allEventDesc: function (callback) {
            $http.get("/api/event/desc/all/")
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
        },

        isFutureEvent: function (val, idx, arr) {
            var tEvent = new Date(val.st_time);
            var tNow = new Date();
            return tEvent > tNow;
        },

        isPastEvent: function (val, idx, arr) {
            var tEvent = new Date(val.st_time);
            var tNow = new Date();
            return tEvent < tNow;
        },
        /* idx: index of item in list of events filtered by filterFunc
         * events: original list
         * filterFunc: filter function. if null list is not filtered
         * Ex: events = [1,2,3], filtered list = [1,3], idx=1
         *     then the item should be 3
         * RETURNS: true if prev item in filtered list has diff date
         *          than the item specified by idx, or if prev item
         *          does not exist in filtered list
         *          otherwise false
         */
        isFirstEventInNewDate: function (idx, events, filterFunc) {            
            if (idx == 0) {
                return true;
            }

            var nth = idx + 1;
            idx = -1;
            var cnt = 0;
            if (filterFunc){                
                while (cnt < nth) {
                    idx += 1;
                    while (!filterFunc(events[idx], null, null)) {
                        idx += 1;                        
                    }
                    cnt += 1;
                }
            }

            var delta = 1;
            if (filterFunc){
                while (!filterFunc(events[idx - delta], null, null)) {
                    delta += 1;
                    if (idx < delta) {
                        return true;
                    }
                }
            }
            if (idx < delta) {
                return true;
            }
            var prev_date_obj = new Date(events[idx - delta].st_time);
            var curr_date_obj = new Date(events[idx].st_time);
            return (prev_date_obj.getDate() != curr_date_obj.getDate())
                   || (prev_date_obj.getMonth() != curr_date_obj.getMonth())
                   || (prev_date_obj.getYear() != curr_date_obj.getYear());
        }
    };
});
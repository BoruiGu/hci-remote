app.filter('datetime', function () {
    function pad(n) {
        return (n < 10) ? ("0" + n) : n;
    }

    return function (input) {
        /* Covert to user's local time */
        var t = new Date(input);
        var day_of_week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return day_of_week[t.getDay()] + ' '
               + t.getMonth() + '/' + t.getDate() + ' '
               + pad(t.getHours()) + ':' + pad(t.getMinutes());
    };
});
app.filter('date', function () {    
    return function (input) {
        var t = new Date(input);
        var day_of_week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return day_of_week[t.getDay()] + ' '
                           + t.getMonth() + '/' + t.getDate();
    };
});

app.filter('time', function () {
    function pad(n) {
        return (n < 10) ? ("0" + n) : n;
    }

    return function (input) {
        var t = new Date(input);
        return pad(t.getHours()) + ':' + pad(t.getMinutes());
    };
});
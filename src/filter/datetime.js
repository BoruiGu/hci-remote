app.filter('date', function () {    
    return function (input) {
        var t = new Date(input);
        var day_of_week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var suffix = [null, 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th', 'th'];
        return day_of_week[t.getDay()] + ', '
               + month[t.getMonth()] + ' '
               + t.getDate() + suffix[t.getDate()];
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
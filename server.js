
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var mysql = require('mysql');

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 2525;

var connection = mysql.createConnection({
    host: process.env.OPENSHIFT_MYSQL_DB_HOST || '127.0.0.1',
    port: process.env.OPENSHIFT_MYSQL_DB_PORT || 3306,
    user: 'admin6n3hter',
    password: 'paxpExGKyDmb',
    database: 'hci'
});

connection.connect();

app.use(express.static(__dirname + '/src'));

app.listen(port, ip);

var sample_level_data = [
    {
        level_name: "Level 1: Bronze",
        level_description: "Description:   This is the first level that you achieve as a UCB member.",
        level_icon_src: "image/level/award-bronze-300x300.jpg", /* link to icon file */
        level_completion_rate: 1.0, /* 0.0 ~ 1.0 */
        badges: [
            {
                badge_name: "3 months in UCB",
                badge_description: "You gain this badge when you are in UCB for 3 months.",
                badge_icon_src: null,
                badge_has_acquired: true
            },
            {
                badge_name: "Attended 10 events",
                badge_description: "You gain this badge when you attend at least 10 UCB or member initiated event.",
                badge_icon_src: null,
                badge_has_acquired: true
            },
        ]
    },
    {
        level_name: "Level 2: Silver",
        level_description: "Description:   This is the second level. To achieve this level, you need to be in UCB for 6 months, attend 18 events and 7 vulenteer events.",
        level_icon_src: "image/level/award-silver-300x300.jpg", /* link to icon file */
        level_completion_rate: 1.0, /* 0.0 ~ 1.0 */
        badges: [
            {
                badge_name: "6 months in UCB",
                badge_description: "You gain this when you are in UCB for 6 months.",
                badge_icon_src: null,
                badge_has_acquired: true
            },
            {
                badge_name: "Attended 18 events",
                badge_description: "You gain this when you attend at least 18 UCB or member initiated event.",
                badge_icon_src: null,
                badge_has_acquired: true
            },
            {
                badge_name: "Attended 7 volunteer events.",
                badge_description: "You gain this when you attend at least 7 volunteer events.",
                badge_icon_src: null,
                badge_has_acquired: true
            },
        ]
    },
    {
        level_name: "Level 3: Pearl",
        level_description: "Description:  This is the third level. To achieve this level, you need to be at UCB for 10 months, attend 30, and 14 volunteer events.",
        level_icon_src: "image/level/pearl.jpg", /* link to icon file */
        level_completion_rate: 1.0, /* 0.0 ~ 1.0 */
        badges: [
            {
                badge_name: "10 months in UCB",
                badge_description: "You gain this when you are in UCB for 10 months.",
                badge_icon_src: null,
                badge_has_acquired: true
            },
            {
                badge_name: "Attended 30 events",
                badge_description: "You gain this when you attend at least 30 UCB or member initiated events.",
                badge_icon_src: null,
                badge_has_acquired: true
            },
            {
                badge_name: "Attended 14 volunteer events.",
                badge_description: "You gain this when you attend at least 14 volunteer events.",
                badge_icon_src: null,
                badge_has_acquired: true
            },
            {
                badge_name: "Created 5 events.",
                badge_description: "You gain this when you create at least 5  events.",
                badge_icon_src: null,
                badge_has_acquired: true
            },
        ]
    },
    {
        level_name: "Level 4: Rubby",
        level_description: "Description",
        level_icon_src: "image/level/ruby3.jpg", /* link to icon file */
        level_completion_rate: 0.75, /* 0.0 ~ 1.0 */
        badges: [
            {
                badge_name: "15 months in UCB",
                badge_description: "You gain this when you are in UCB for 15 months.",
                badge_icon_src: null,
                badge_has_acquired: true
            },
            {
                badge_name: "Attended 45 events",
                badge_description: "You gain this when you attend at least 45 UCB or member initiated events.",
                badge_icon_src: null,
                badge_has_acquired: true
            },
            {
                badge_name: "Attendeded 20 volunteer events.",
                badge_description: "You gain this when you attend at least 20 volunteer events.",
                badge_icon_src: null,
                badge_has_acquired: false
            },
            {
                badge_name: "Created 10 events.",
                badge_description: "You gain this when you create at least 10  events.",
                badge_icon_src: null,
                badge_has_acquired: false
            },
        ]
    },
    {
        level_name: "Emerald",
        level_description: "Lv5 Description",
        level_icon_src: "image/level/emerald.jpg", /* link to icon file */
        level_completion_rate: 0.0, /* 0.0 ~ 1.0 */
        badges: []
    },
    {
        level_name: "Gold",
        level_description: "Lv6 Description",
        level_icon_src: "image/level/award-gold-300x300.jpg", /* link to icon file */
        level_completion_rate: 0.0, /* 0.0 ~ 1.0 */
        badges: []
    }
];

app.get('/api/hello/:val', function (req, res) {	
    res.send('Hello from ' + req.params.val + '!');
});

app.post('/api/event/create', function (req, res) {
    connection.query('insert into event SET ?', req.body,
    function (err, rows, fields) {
        res.send(200);
    });
});

app.delete('/api/event/:id', function (req, res) {
    connection.query('delete from event where id = ?', req.params.id,
    function (err, rows, fields) {
        res.send(200);
    });
});

app.get('/api/event/bycreator/:username', function (req, res) {
    var username = req.params.username;
    var queryString = 'select * '
                    + 'from event '
                    + 'where creator = ? '
                    + 'order by st_time asc';
    connection.query(queryString, username,
    function (err, rows, fields) {
        res.json(rows);
    });
});
/* events created by any user except "UCB" */
app.get('/api/event/bymember/', function (req, res) {
    var queryString = 'select * '
                    + 'from event '
                    + 'where creator != "UCB" '
                    + 'order by st_time asc';
    connection.query(queryString,
    function (err, rows, fields) {
        res.json(rows);
    });
});
app.get('/api/event/all/', function (req, res) {
    var queryString = 'select * '
                    + 'from event '
                    + 'order by st_time asc';
    connection.query(queryString,
    function (err, rows, fields) {
        res.json(rows);
    });
});

app.get('/api/event/desc/all/', function (req, res) {
    var queryString = 'select * '
                    + 'from event '
                    + 'order by st_time desc';
    connection.query(queryString,
    function (err, rows, fields) {
        res.json(rows);
    });
});
app.get('/api/event/desc/bycreator/:username', function (req, res) {
    var username = req.params.username;
    var queryString = 'select * '
                    + 'from event '
                    + 'where creator = ? '
                    + 'order by st_time desc';
    connection.query(queryString, username,
    function (err, rows, fields) {
        res.json(rows);
    });
});
/* events created by any user except "UCB" */
app.get('/api/event/desc/bymember/', function (req, res) {
    var queryString = 'select * '
                    + 'from event '
                    + 'where creator != "UCB" '
                    + 'order by st_time desc';
    connection.query(queryString,
    function (err, rows, fields) {
        res.json(rows);
    });
});

app.get('/api/event/byid/:id', function (req, res) {
    var id = req.params.id;
    var queryString = 'select * '
                    + 'from event '
                    + 'where id = ? ';
    connection.query(queryString, id,
    function (err, rows, fields) {
        res.json(rows[0]);
    });
});

app.get('/api/rsvp/byid/:id', function (req, res) {
    var id = req.params.id;
    var queryString = 'select username, message '
                    + 'from rsvp '
                    + 'where event_id = ? '
                    + 'order by rsvp_time asc';
    connection.query(queryString, id,
    function (err, rows, fields) {
        res.json(rows);
    });
});

app.get('/api/rsvp/byusername/:username', function (req, res) {
    var username = req.params.username;
    var queryString = 'select event_id, message '
                    + 'from rsvp '
                    + 'where username = ? '
                    + 'order by rsvp_time asc';
    connection.query(queryString, username,
    function (err, rows, fields) {
        res.json(rows);
    });
});

app.post('/api/rsvp/', function (req, res) {
    connection.query('insert into rsvp SET ?', req.body, 
    function (err, rows, fields) {
        res.send(200);
    });
});

app.delete('/api/rsvp/:event_id/:username', function (req, res) {
    connection.query('delete from rsvp where event_id = ? and username = ?',
    [req.params.event_id, req.params.username],
    function (err, rows, fields) {
        res.send(200);
    });
});

app.get('/api/level/:username', function (req, res) {
    var username = req.params.username;
    res.json(sample_level_data);
});



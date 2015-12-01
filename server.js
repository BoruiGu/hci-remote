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
        level_name: "Lv 1",
        level_description: "Lv1 Description",
        level_icon_src: null, /* link to icon file */        
        level_completion_rate: 1.0, /* 0.0 ~ 1.0 */
        badges: [
            {
                badge_name: "B1",
                badge_description: "B1 Description",
                badge_icon_src: null,
                badge_has_acquired: true
            },
            {
                badge_name: "B2",
                badge_description: "B2 Description",
                badge_icon_src: null,
                badge_has_acquired: true
            },
        ]
    },
    {
        level_name: "Lv 2",
        level_description: "Lv2 Description",
        level_icon_src: null, /* link to icon file */
        level_completion_rate: 1.0, /* 0.0 ~ 1.0 */
        badges: [
            {
                badge_name: "B3",
                badge_description: "B3 Description",
                badge_icon_src: null,
                badge_has_acquired: true
            },
            {
                badge_name: "B4",
                badge_description: "B4 Description",
                badge_icon_src: null,
                badge_has_acquired: true
            },
            {
                badge_name: "B5",
                badge_description: "B5 Description",
                badge_icon_src: null,
                badge_has_acquired: true
            },
        ]
    },
    {
        level_name: "Lv 3",
        level_description: "Lv3 Description",
        level_icon_src: null, /* link to icon file */
        level_completion_rate: 0.75, /* 0.0 ~ 1.0 */
        badges: [
            {
                badge_name: "B6",
                badge_description: "B6 Description",
                badge_icon_src: null,
                badge_has_acquired: true
            },
            {
                badge_name: "B7",
                badge_description: "B7 Description",
                badge_icon_src: null,
                badge_has_acquired: true
            },
            {
                badge_name: "B8",
                badge_description: "B8 Description",
                badge_icon_src: null,
                badge_has_acquired: true
            },
            {
                badge_name: "B9",
                badge_description: "B9 Description",
                badge_icon_src: null,
                badge_has_acquired: false
            },
        ]
    },
    {
        level_name: "Lv 4",
        level_description: "Lv4 Description",
        level_icon_src: null, /* link to icon file */
        level_completion_rate: 0.0, /* 0.0 ~ 1.0 */
        badges: []
    },
    {
        level_name: "Lv 5",
        level_description: "Lv5 Description",
        level_icon_src: null, /* link to icon file */
        level_completion_rate: 0.0, /* 0.0 ~ 1.0 */
        badges: []
    },
    {
        level_name: "Lv 6",
        level_description: "Lv6 Description",
        level_icon_src: null, /* link to icon file */
        level_completion_rate: 0.0, /* 0.0 ~ 1.0 */
        badges: []
    }
];

app.get('/api/hello/:val', function (req, res) {	
    res.send('Hello from ' + req.params.val + '!');
});

app.get('/api/event/bycreator/:username', function (req, res) {
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
                    + 'order by rsvp_time desc';
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
                    + 'order by rsvp_time desc';
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

app.get('/api/level/:username', function (req, res) {
    var username = req.params.username;
    res.json(sample_level_data);
});

//connection.end();
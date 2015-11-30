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

app.get('/api/hello/:val', function (req, res) {	
    res.send('Hello from ' + req.params.val + '!');
});

app.get('/api/event/bycreator/:username', function (req, res) {
    var username = req.params.username;
    var queryString = 'select id, st_time, title, description '
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

app.get('/api/rsvp/:id', function (req, res) {
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

//connection.end();
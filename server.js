﻿var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 2525;

app.get('/hello', function (req, res) {
    res.send('hello world');
});

app.use(express.static(__dirname + '/src'));

app.listen(port, ip);

//connection.end();
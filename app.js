var express = require("express");
var app = express();
var server = require('http').createServer(app).listen(process.env.VCAP_APP_PORT || 8080);
var path = require('path');

app.use(express.static(path.resolve(".")));

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/landing/' + 'index.html');
});

app.get('/app/', function (req, res) {
    res.sendfile(__dirname  + 'index.html');
});

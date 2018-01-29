var express = require('express');
var app = express();
var path = require('path');
var https = require('https');
var fs = require('fs');

var options = {
    requestCert: false,
    rejectUnauthorized: false
};

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.use('/extensions', express.static('extensions'));

var server = https.createServer(options, app).listen(3000, function(){
    console.log("server started at port 3000");
});


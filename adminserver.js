/*global require */
/*jslint node: true */

'use strict';


var express = require('express'),
    http = require('http'),
    routes = require('./routes'),
    path = require('path');

var app = express();

app.configure(function () {
    app.set('view engine', 'html');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(path.join(__dirname, 'public')));
    app.set('views', __dirname + '/views');
    app.engine('html', require('ejs').renderFile);
    app.use(app.router);
});

app.configure('development', function () {
    app.use(express.errorHandler());
});


app.get('/', routes.home);
app.get('/*', routes.index);


var port = Number(process.env.PORT || 5000);
http.createServer(app).listen(port, function () {
    console.log("Express server listening on port " + port + __dirname);
});
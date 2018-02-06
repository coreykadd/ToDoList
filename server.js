//Server.js

//Setup
var express = requre('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');  //Logs requests to the console
var bodyParser = require('body-parser'); //Pulls info from HTML POST
var methodOverride = require('method-override'); //Simulates DELETE and PUT

//Config
mongoose.connect('mongodb://localhost:27017/todo');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'})); //Parse application/x-www-form-urlencoded
app.use(bodyParser.json()); //Parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); //Parse application/vnd.api+json as json
app.use(methodOverride());
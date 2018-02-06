//Server.js

//Setup
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');  //Logs requests to the console
var bodyParser = require('body-parser'); //Pulls info from HTML POST
var methodOverride = require('method-override'); //Simulates DELETE and PUT

//Config
mongoose.connect('mongodb://localhost:27017/todo');

mongoose.connection.on('error', function(){
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

mongoose.connection.once('open', function(){
    console.log('Successfully connected to the database');
})

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'})); //Parse application/x-www-form-urlencoded
app.use(bodyParser.json()); //Parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); //Parse application/vnd.api+json as json
app.use(methodOverride());

//Module
var Todo = mongoose.model('Todo', {
    text: String
});

//Routes
/*app.get('/', function(req, res){
    res.send('hello');
});*/

app.get('/api/todos', function(req, res) {
    Todo.find(function(err, todos) {
        if(err)
        res.send(err);

        res.json(todos);
    });
});

app.post('/api/todos', function(req, res){
    Todo.create({
        text: req.body.text,
        done: false
    }, function(err, todo) {
        if(err)
        res.send(err);

        Todo.find(function(err, todos){
            if(err)
            res.send(err);

            res.json(todos);
        });
    });
});

app.delete('/api/todos/:todo_id', function(req, res){
    Todo.remove({
        _id: req.params.todo_id
    }, function(err, todo){
        if(err)
        res.send(err);

        res.send('todo removed');
    });
});

//Application
app.get('*', function(req, res){
    res.sendfile('./app/index.html');
});

//Listen
app.listen(8080);
console.log('App listening to port 8080');
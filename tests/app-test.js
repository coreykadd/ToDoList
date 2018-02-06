var expect = require('chai').expect;
var request = require('request');
var mongoose = require('mongoose');

describe('Connection', function(){
    it('Status', function(){
        request('http://localhost:8080/', function(err, res, body){
            expect(res.statusCode).to.equal(200);
            done();
        });
    });
});

describe('Todo', function(){
    it('get status', function(){
        request('http://localhost:8080/api/todos', function(err, res, body){
            expect(res.statusCode).to.equal(200);
            done();
        });
    });
});

//Module
var Todo = mongoose.model('Todo', {
    text: String
});

describe('Database', function(){
    it('connected', function() {
        before(function(){
            mongoose.connect('mongodb://localhost:27017/todoTest');
            var db = mongoose.connection;
            db.on('error', console.error.bind(console, 'Connection error'));
            db.once('Connected to database');
            done();
        });
    });

    it('Create todo', function(){
        var testTodo = Todo({
            text: 'Start testing todo list'
        });

        testTodo.save();
    })

    it('Find todo', function(){
        Todo.find({text: 'Start testing todo list'}, function(err, todo){
            if(err)
            throw err;

            console.log(todo);
        });
    });

    /*it('Delete todo', function(){
        Todo.remove({text: 'Start testing todo list'}, function(err, todo){
            if(err)
            throw err;

            console.log(todo);
        });
    })

    it('drop db', function(){
        after(function(){
            mongoose.connection.db.dropDatabase('todoTest');
        });
    });*/
});
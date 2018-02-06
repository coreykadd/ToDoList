var expect = require('chai').expect;
var request = require('request');

describe('Getting todo list', function(){
    it('Status', function(done){
        request('http://localhost:8080/api/todos', function(err, res, body){
            expect(res.statusCode).to.equal(200);
            done();
        });
    });
});
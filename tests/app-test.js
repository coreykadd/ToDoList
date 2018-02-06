var expect = require('chai').expect;
var request = require('request');

describe('Connection', function(){
    it('Status', function(done){
        request('http://localhost:8080/', function(err, res, body){
            expect(res.statusCode).to.equal(200);
            done();
        });
    });
});
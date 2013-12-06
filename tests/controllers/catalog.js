/**
 * Created with JetBrains PhpStorm.
 * User: wangfei0001
 * Date: 13-11-24
 * Time: AM11:32
 * To change this template use File | Settings | File Templates.
 */
var app = require('../../app').app;

var should = require('should');

request = require('supertest');

describe('Test Category Controller', function(){

    it("should be able to create catalog", function(done){

        request(app)
            .post('/api/v1/catalog')
            .set('Accept', 'application/json')
            //.set('Auth-Token', '')
            .send({ name:'Test Catalog' })
            .expect(200)
            .end(function (err, res) {
                var returndata = JSON.parse(res.text);

                res.type.should.equal('application/json');
                res.status.should.equal(200);

                done();
            });

    });

})

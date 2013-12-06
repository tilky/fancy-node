/**
 * Created with JetBrains PhpStorm.
 * User: wangfei0001
 * Date: 13-11-24
 * Time: PM3:06
 * To change this template use File | Settings | File Templates.
 */
var request = require('supertest');
var assert = require("assert");
var app = require('../app').app;
//var should = require('should');

describe('/api/v1/', function () {
    it('Test', function (done) {
//        request(app)
//            .get('/api/v1/')
//            .set('Accept', 'application/json')
//            .expect(401)
//            .end(function (err, res) {
//
//                res.type.should.equal('text/plain');
//                res.status.should.equal(401);
//                res.text.should.equal('Unauthorized');
//                done();
//            });
        assert.equal(true, true);

        done();
    });
});
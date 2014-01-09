/**
 * Created with JetBrains PhpStorm.
 * User: wangfei0001
 * Date: 13-11-24
 * Time: AM11:33
 * To change this template use File | Settings | File Templates.
 */
var Common = require('../common');

var assert = require("assert");


describe('User Model', function(){



    before(function(done){

        Common.loadData();

        done();
    });

    it('test', function(){
        assert.equal(true, true);

    });


    after(function(done){

        done();

    });

})

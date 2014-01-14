/**
 * Created with JetBrains PhpStorm.
 * User: wangfei0001
 * Date: 14-1-10
 * Time: PM11:34
 * To change this template use File | Settings | File Templates.
 */
var assert = require("assert");

var Thumbor = require('../../models/thumbor');

describe('Test thumbor service', function() {


    it('Test Generate url', function(){

        var url = Thumbor.getUrl('test.jpg', 200, 200);

        console.log(url);


    });


});
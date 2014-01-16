/**
 * Created with JetBrains PhpStorm.
 * User: wangfei0001
 * Date: 14-1-16
 * Time: PM10:44
 * To change this template use File | Settings | File Templates.
 */
var Facebook = require('facebook-node-sdk');

var facebook = new Facebook({
    appId: '376384352390979',
    secret: '667f3b55c3c960ee6b442d0bbf92ac77',
    request: {
        connection: {
        },
        headers: {
            host: 'localhost'
        },
        url: '/unit-tests.php'
    }
});









module.exports = facebook;
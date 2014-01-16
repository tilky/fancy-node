/**
 * Created with JetBrains PhpStorm.
 * User: wangfei0001
 * Date: 14-1-17
 * Time: AM12:42
 * To change this template use File | Settings | File Templates.
 */
var weibo = require('weibo');

// change appkey to yours
var appkey = '2674354511';
var secret = '18afa6cf4a64e0befba2c3dafc9bb28d';
var oauth_callback_url = 'http://localhost.com/api/v1/user/login?type=weibo';

weibo.init('weibo', appkey, secret, oauth_callback_url);












module.exports = weibo;
/**
 * Created with JetBrains PhpStorm.
 * User: wangfei0001
 * Date: 13-11-6
 * Time: PM9:06
 * To change this template use File | Settings | File Templates.
 */

var catalog = require('./catalog');

var product = require('./product');

var price = require('./price');

var comment = require('./comment');

var user = require('./user');

var address = require('./address');

var image = require('./image');

var sns = require('./sns');

module.exports.catalog = catalog;

module.exports.product = product;

module.exports.price = price;

module.exports.user = user;

module.exports.address = address;

module.exports.image = image;

module.exports.sns = sns;

module.exports.comment = comment;
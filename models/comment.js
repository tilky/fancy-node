/**
 * Created with JetBrains PhpStorm.
 * User: wangfei0001
 * Date: 14-1-25
 * Time: PM4:34
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var moment = require('moment');

var commentSchema = new Schema({
    comment: String,
    productId: String,
    userId: String,
    status: {type: Boolean, default: true},
    deleted: {type: Boolean, default: false},
    createdAt: Date,
    modifiedAt: {type: Date, default: Date.now}
});


module.exports = mongoose.model('Comment', commentSchema);
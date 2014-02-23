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

var User = require('./user');

var commentSchema = new Schema({
    comment: String,
    productId: String,
    userId: { type: mongoose.Schema.ObjectId, ref: 'User' },
    status: {type: Boolean, default: true},
    deleted: {type: Boolean, default: false},
    createdAt: Date,
    modifiedAt: {type: Date, default: Date.now}
});

/***
 * Per save, data validation
 */
commentSchema.pre('save', function (next) {
    if(this.isNew) this.createdAt = Date.now();
    next();
});

commentSchema.statics.getList = function(cb){

    var self = this;

    self.find().populate('userId').exec(function(err, comments) {
        if (err) { return console.log(err); }

        var result = [];

        for(var i in comments){
            var comment = comments[i];
            var user = new User(comment.userId);
            result.push({
                comment_id : comment._id,
                comment : comment.comment,
                created_at: comment.created_at,
                user : user.getBrief()
            });
        }

        cb(null, result);
    });
};

var Comment = mongoose.model('Comment', commentSchema);

Comment.schema.path('productId').validate(function (value, response) {
    var Product = require('./product');

    Product.findById(value, function(err, product){
        if(err) return response(false);

        if(!product) return response(false);

        response(true);
    });
}, 'Product not found');

module.exports = Comment;
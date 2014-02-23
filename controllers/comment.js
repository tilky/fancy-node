/**
 * Created with JetBrains PhpStorm.
 * User: wangfei0001
 * Date: 14-1-25
 * Time: PM4:34
 * To change this template use File | Settings | File Templates.
 */
var Comment = require('../models/comment');

var Product = require('../models/product');

var User = require('../models/user')




var comment = {


    post : function(req, res, next) {

        var data = {
            userId : req.body.user_id,
            productId : req.body.product_id,
            comment: req.body.comment
        }

        new Comment(data).save(function(err, comment){
            if(err) return next(err);

            return res.json({
                id: comment._id
            });
        });


    },

    list : function(req, res, next){
        Comment.getList(function(err, comments) {
            if(err) return next(err);

            res.json(comments);
            res.end();
        });
    },

    get : function(req, res, next){


    },

    delete : function(req, res, next){

    },

    put : function(req, res, next){


    }
};


module.exports = comment;
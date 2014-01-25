/**
 * Created with JetBrains PhpStorm.
 * User: wangfei0001
 * Date: 13-11-15
 * Time: PM9:40
 * To change this template use File | Settings | File Templates.
 */

var Image = require('../models/image');

var Product = require('../models/product');

var fs = require('fs');

var image = {

    /***
     * 给产品添加图片
     *
     * @param req
     * @param res
     */
    post : function(req, res, next) {
        var id = req.params.id;

        Product.findById(id, function(err, product){

            if(err) throw err;

            var Upload = require('../models/upload');

            var upload = new Upload(req.files.image);

            upload.save(id, function(err, result){
                if(err) return next(err);

                res.end();
            });

        });


    },


    /***
     * 获取该产品的所有图片
     *
     * @param req
     * @param res
     */
    list : function(req, res, next){
        var id = req.params.id;

        Product.findById(id, function(err, product){

            if(err) return next(err);

            if(!product) return res.send(404);

            product.getImages(function(err, images){
                if(err) throw err;

                res.json(images);

                res.end();
            });


        });
    },


    /***
     * 删除产品的图片
     *
     * @param req
     * @param res
     */
    delete : function(req, res){
        var id = req.params.id;

        var image_id = req.params.image_id;

        Product.findById(id, function(err, product){

            if(err) throw err;

            product.deleteImage(image_id, function(err, result){

                if(err) throw err;

                res.end();
            });

        });
    }

};




module.exports = image;
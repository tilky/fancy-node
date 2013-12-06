/**
 * Created with JetBrains PhpStorm.
 * User: wangfei0001
 * Date: 13-11-9
 * Time: PM1:09
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var productSchema = new Schema({
    name:  String,
    catalogId: String,      //目录
    description: String,    //产品描述
    retail_price : Number,  //销售价
    market_price : Number,  //市场价格
    quantity : Number,      //库存数量
    status : {type: Number, default: 0},    //状态，0草稿 1正常
    createdAt: {type: Date, default: Date.now},
    modifiedAt : {type: Date, default: null}
});





productSchema.pre('save', function (next) {


    if(this._id) this.modifiedAt = Date.now();

    if(this.catalogId){
//        this.model('Catalog').find({ _id: this.parentId }, function(err, catalog){
//
//            if(catalog){
//                next();
//            }else{
//                next(new Error('Can not found the parent catalog'));
//            }
//
//        });
        next();
    }else{
        next();
    }
});


//productSchema.pre('update', function(next){
//
//    this.model('Product').modifiedAt = Date.now();
//    next();
//});


/***
 * Set the status for the product, draft or normal
 *
 * @param status
 * @param cb
 */
productSchema.methods.setStatus = function(status, cb){

    var self = this;

    self.status = status;

    this.save(function(err, product){
        if(err) return cb(err);

        return cb(null, product);
    });
};


productSchema.methods.deleteImage = function(image_id, cb){

    var fs = require('fs');

    var Image = require('./image');


    var self = this;

    Image.findById(image_id, function(err, image){

        if(err) return cb(err);

        var files = [];

        var originFile = global.getConfig('upload_path') + self._id + '/' + image.file_name;

        files.push(originFile);

        //delete thumbs
        var dimensions = global.getConfig('thumbs_dimensions');
        var arr = image.file_name.split('.');
        for(var i in dimensions){
            var url = global.getConfig('upload_path') + self._id + '/' + arr[0] + '.' + dimensions[i] + '.' + arr[1];
            files.push(url);
        }

        var async = require('async');

        async.forEach(files, function(path, callback){
            var realpath = __dirname + '/..' + path;

            fs.unlink(realpath, callback);

        }, function(err, result){
            if(err) return cb(err);

            //fs.rmdir(__dirname + '/..' + global.getConfig('upload_path') + self._id, function(err){


                image.remove(cb);
            //});
        });


    });



};

/***
 * Get all the images
 *
 * @param cb
 */
productSchema.methods.getImages = function(cb){

    var Image = require('./image');

    var self = this;

    Image.find({productId : this._id}, function(err, images){
        if(err) return cb(err);

        var result = [];

        var dimensions = global.getConfig('thumbs_dimensions');
        for(var i in images){
            var arr = images[i].file_name.split('.');
            var imageData = [];
            for(var j in dimensions){
                var url = global.getConfig('upload_path') + self._id + '/' + arr[0] + '.' + dimensions[j] + '.' + arr[1];
                imageData.push(url);
            }
            result.push({
                "file_name": images[i].file_name,
                "origin_mimetype": images[i].origin_mimetype,
                "origin_filename": images[i].origin_filename,
                "origin_size": images[i].origin_size,
                images : imageData
            });
        }
        cb(null, result);
    });

};

module.exports = mongoose.model('Product', productSchema);
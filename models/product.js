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

module.exports = mongoose.model('Product', productSchema);
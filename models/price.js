/**
 * Created with JetBrains PhpStorm.
 * User: wangfei0001
 * Date: 13-11-9
 * Time: PM9:46
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var priceSchema = new Schema({
    low: Number,
    high: Number,
    currency: String,
    createdAt: Date,
    modifiedAt: {type: Date, default: Date.now}
});



priceSchema.pre('save', function (next) {
//    if(this.parentId){
//        this.model('Catalog').find({ _id: this.parentId }, function(err, catalog){
//
//            if(catalog){
//                next();
//            }else{
//                next(new Error('Can not found the parent catalog'));
//            }
//
//        });
//    }else{
        next();
//    }
});


/***
 * Get Support currency
 *
 * @return {Array}
 */
priceSchema.statics.getCurrencies = function(){

    return ['USD', 'AUD', 'CNY'];
};

module.exports = mongoose.model('Price', priceSchema);
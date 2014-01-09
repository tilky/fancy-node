/**
 * Created with JetBrains PhpStorm.
 * User: wangfei0001
 * Date: 13-11-9
 * Time: PM10:25
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    email: String,
    firstname: String,
    lastname: String,
    password: String,
    status: {type: Number, default: 0},
    deleted: {type: Boolean, default: false},
    createdAt: Date,
    modifiedAt: {type: Date, default: Date.now}
});



userSchema.pre('save', function (next) {
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


module.exports = mongoose.model('User', userSchema);
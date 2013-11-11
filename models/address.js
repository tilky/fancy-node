/**
 * Created with JetBrains PhpStorm.
 * User: wangfei0001
 * Date: 13-11-10
 * Time: PM1:47
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var addressSchema = new Schema({
    userId: String,
    name:  String,
    company: String,
    address1: String,
    address2: String,
    postcode: String,
    phone: String,
    mobile: String,
    isDefault: Boolean,
    createdAt: {type: Date, default: Date.now}
});



addressSchema.pre('save', function (next) {
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
 * Set this address as default address
 *
 * @param cb
 */
addressSchema.methods.setDefault = function(cb){

    this.isDefault = true;

    var self = this;

    this.save(function(err, address){

        if(err) return cb(err);

        console.log('set to default');

        //change other to false

        self.model('Address').
            where("isDefault").ne(false).
            where("_id").ne(self._id).
            find({ userId : self.userId }, function(err, addresses){

                if(err) return cb(err);

                if(addresses.length == 0){
                    return cb(null, address);
                }else{
                    var async = require('async');

                    async.eachSeries(addresses, function(address, callback){
                        address.isDefault = false;

                        address.save(function(err, address){
                            if(err) return callback(err);

                            return callback();

                        });


                    }, function(err){
                        console.log(addresses);


                        return cb(null, address);
                    });
                }
        });



    })


};


module.exports = mongoose.model('Address', addressSchema);
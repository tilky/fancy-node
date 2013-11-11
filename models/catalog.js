/**
 * Created with JetBrains PhpStorm.
 * User: wangfei0001
 * Date: 13-11-6
 * Time: PM9:08
 * To change this template use File | Settings | File Templates.
 */

var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var catalogSchema = new Schema({
    name:  String,
    parentId: String,
    createdAt: {type: Date, default: Date.now}
});



catalogSchema.pre('save', function (next) {
    if(this.parentId){
        this.model('Catalog').find({ _id: this.parentId }, function(err, catalog){

            if(catalog){
                next();
            }else{
                next(new Error('Can not found the parent catalog'));
            }

        });
    }else{
        next();
    }
});


module.exports = mongoose.model('Catalog', catalogSchema);

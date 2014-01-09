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
    description: String,
    parentId: String,
    deleted: {type: Boolean, default: false},
    createdAt: Date,
    modifiedAt: {type: Date, default: Date.now}
});




/***
 * Per save, data validation
 */
catalogSchema.pre('save', function (next) {

    if(!this.isNew) this.modifiedAt = Date.now();

    if(this.parentId){
        this.model('Catalog').find({ _id: this.parentId }, function(err, catalog){
            if(err) return next(err);

            if(!catalog){
                return next(new Error('Can not found the parent catalog'));
            }

        });
    }
    next();
});


var Catalog = mongoose.model('Catalog', catalogSchema);

//Validate category name
Catalog.schema.path('name').validate(function (value) {
    return /^[\w\s]{2,32}$/.test(value);
}, 'Invalid Catalog Name, should have 2~32 characters');


//Validate parent id
Catalog.schema.path('parentId').validate(function (value) {
    return this.parentId == this._id ? false : true;
}, 'Parent ID can not be itself');


module.exports = Catalog;


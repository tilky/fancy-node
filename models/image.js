/**
 * Created with JetBrains PhpStorm.
 * User: wangfei0001
 * Date: 13-11-15
 * Time: PM9:40
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var imageSchema = new Schema({
    file_name: String,
    origin_mimetype: String,
    origin_filename: String,
    origin_size: String,
    productId: String           //foreigner product id
});

//imageSchema.pre('remove', function(next) {
//
//    console.log(this);
//
//});

module.exports = mongoose.model('Image', imageSchema);
/**
 * Created with JetBrains PhpStorm.
 * User: wangfei0001
 * Date: 13-11-15
 * Time: PM9:40
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var Thumbor = require('./thumbor');

var imageSchema = new Schema({
    file_name: String,
    description: String,
    mimetype: String,
    filename: String,
    size: String,
    productId: String           //foreigner product id
});

//imageSchema.pre('remove', function(next) {
//
//    console.log(this);
//
//});

imageSchema.methods.allSize = function()
{
    var self = this;

    var path = self.getPath();
    return {
        m: Thumbor.getUrl(path, 500, 500)
    };
};


/***
 * Get thumb url
 *
 * @param width
 * @param height
 * @return {*}
 */
imageSchema.methods.getThumb = function(width, height)
{
    return Thumbor.getUrl(this.getPath(), width, height);
}


/***
 * Get the full path
 *
 * @return {String}
 */
imageSchema.methods.getPath = function()
{
    return this.productId + '/' + this.file_name;
}

/***
 * Get Extension name
 *
 * @param mimetype
 * @return {String}
 */
imageSchema.statics.getExt = function(mimetype){

    switch(mimetype){
        case 'image/jpeg':
            return 'jpg';
        case 'image/png':
            return 'png';
        case 'image/gif':
            return 'gif';
        case 'image/bmp':
            return 'bmp';
    }
};

module.exports = mongoose.model('Image', imageSchema);
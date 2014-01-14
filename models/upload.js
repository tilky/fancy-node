/**
 * Created with JetBrains PhpStorm.
 * User: wangfei0001
 * Date: 13-11-17
 * Time: PM5:50
 * To change this template use File | Settings | File Templates.
 */
module.exports = function(file){

    var fs = require('fs');

    var Image = require('./image');

    var init = function(){
        var mimetype = file.type;

        //check the content type
        switch(mimetype){
            case "image/gif":
            case "image/jpeg":
            case "image/png":
                break;
            default:
                throw 'Not support file type';
                break;
        }
        if(file.size <= 0) throw 'Incorrect file size';

    };


    /***
     * Return a random string
     *
     * @return {String}
     */
    var randomString = function(){
        var d = new Date().getTime();
        var id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x7|0x8)).toString(16);
        });
        return id;
    };






    init();


    return {



        /**
         * Save the image file to local
         */
        save : function(product_id, cb){

            var mkdirp = require('mkdirp');

            var newFilename = randomString();

            newFilename += '.' + Image.getExt(file.type);

            var newPath = __dirname + '/../' + global.getConfig('upload_path') + '/' + product_id + '/';

            mkdirp(newPath, function(err){
                if(err) return cb(err);

                fs.readFile(file.path, 'binary', function(err, data){
                    if(err) return cb(err);

                    fs.writeFile(newPath + newFilename, data, 'binary', function(err){
                        if(err) return cb(err);
                        //var dimensions = global.getConfig('thumbs_dimensions');

                        console.log('Saved image file! ' + newFilename);
                        //now we will update the database
                        var data = {
                            file_name: newFilename,
                            mimetype: file.type,
                            filename: file.name,
                            size: file.size,
                            productId: product_id
                        };

                        new Image(data).save(function(err, image){
                            if(err) throw err;

                            cb(null, image);
                        });

                    })
                });


            });
        }

    };
};
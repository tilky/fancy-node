/**
 * Created with JetBrains PhpStorm.
 * User: wangfei0001
 * Date: 13-11-17
 * Time: PM5:50
 * To change this template use File | Settings | File Templates.
 */
module.exports = function(file){

    var fs = require('fs');

    var easyimg = require('easyimage');

    var Image = require('./image');


    console.log(file);


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

            var newPath = __dirname + '/../' + global.getConfig('upload_path') + product_id + '/';

            mkdirp(newPath, function(err){
                if(err) return cb(err);

                easyimg.convert({           //convert the original file and save it.
                    src: file.path,
                    dst: newPath + newFilename + '.jpg',
                    quality: 100
                }, function(err, image){
                    if(err) return cb(err);

                    var dimensions = global.getConfig('thumbs_dimensions');


                    /***
                     * Generate small thumbs
                     *
                     * @param width
                     * @param cb
                     */
                    var generateThumb = function(width, cb){
                        console.log('Generate width:' + width);

                        easyimg.resize({
                                src: file.path,
                                dst: newPath + newFilename + '.' + width + '.jpg',
                                width: width
                            },
                            function(err, image){
                                if(err) return cb(err);

                                cb();
                            });
                    };

                    /***
                     * Save thumbs
                     *
                     * @type {*}
                     */
                    var async = require('async');

                    async.forEach(dimensions, function(width, callback){
                        generateThumb(width, callback);
                    }, function(err, result){
                        if(err) return cb(err);

                        console.log('All saved image files! ' + newFilename);
                        //now we will update the database
                        var data = {
                            file_name: newFilename + '.jpg',
                            origin_mimetype: file.type,
                            origin_filename: file.name,
                            origin_size: file.size,
                            productId: product_id
                        };

                        new Image(data).save(function(err, image){
                            if(err) throw err;

                            cb(null, image);
                        });

                    });

                });
            });
        }

    };
};
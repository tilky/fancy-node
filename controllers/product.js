/**
 * Created with JetBrains PhpStorm.
 * User: wangfei0001
 * Date: 13-11-9
 * Time: AM9:04
 * To change this template use File | Settings | File Templates.
 */
var Product = require('../models/product.js');

var product = {

    /***
     * Create a new product
     *
     * @param req
     * @param res
     */
    post : function(req, res) {
        var name = req.body.name;

        var catalogId = req.body.catalogId;

        var description = req.body.description;

        var retail_price = req.body.retail_price;

        var market_price = req.body.market_price;

        var quantity = req.body.quantity;

        var sku = req.body.sku;

        var upc = req.body.upc;

        var ean = req.body.ean;

        var jan = req.body.jan;

        var isbn = req.body.isbn;

        var mpn = req.body.mpn;


        var data = {
            name: name,
            catalogId : catalogId,
            description : description,
            retail_price : retail_price,
            market_price : market_price,
            quantity : quantity,
            status : 0,
            sku: sku,
            upc: upc,
            ean: ean,
            jan: jan,
            isbn: isbn,
            mpn: mpn
        };
        new Product(data).save(function(err, product){
            if(err) throw err;

            res.json(product._id);
            res.end();
        });

    },


    /***
     * List all products
     *
     * @param req
     * @param res
     */
    list : function(req, res){


        Product.find(function(err, products){
            if(err) throw err;


            res.json(products);
            res.end();

        });
    },


    /***
     * Modify the product
     *
     * @param req
     * @param res
     */
    put : function(req, res, next){
        var id = req.params.id;


        Product.findById(id, function(err, product){
            if(err) return next(err);

            product.name = req.body.name;
            product.catalogId = req.body.catalogId;
            product.meta_keywords = req.body.meta_keywords;
            product.meta_description = req.body.meta_description;
            product.description = req.body.description;
            product.retail_price = req.body.retail_price;
            product.market_price = req.body.market_price;
            product.quantity = req.body.quantity;
            product.sku = req.body.sku;
            product.upc = req.body.upc;
            product.ean = req.body.ean;
            product.jan = req.body.jan;
            product.isbn = req.body.isbn;
            product.mpn = req.body.mpn;

            product.save(function(err, product){
                if(err) throw err;

                res.json(product._id);
                res.end();
            });
        });

    },


    /***
     * Get catalog details
     *
     * @param req
     * @param res
     */
    get : function(req, res, next){
        var id = req.params.id;

        var with_image = req.query.with_image;

        Product.findById(id,function(err, product){
            if(err) throw err;

            if(!product) return res.send(404);

            if(with_image){
                product.getImages(function(err, images){
                    if(err) throw err;

                    var retu = {};

                    retu = product.toObject();

                    retu['images'] = images;

                    res.json(retu);

                    res.end();
                });
            }else{
                res.json(product);

                res.end();
            }

        });
    },

    /***
     * Delete a product
     *
     * @param req
     * @param res
     */
    delete : function(req, res, next){
        var id = req.params.id;

        Product.findById(id, function(err, product){
            if(err) return next(err);

            console.log(product);

            product.remove();
            res.end();
        });



    },


    /***
     * Set status for the product
     *
     * @param req
     * @param res
     */
    setStatus : function(req, res, next){

        var id = req.params.id;

        var status = req.body.status;

        Product.findById(id, function(err, product){
            if(err) return next(err);

            if(product){

                product.setStatus(status, function(err, product){

                    res.end();
                });

            }else{
                return next('Product not found');
            }
        });

    }
};


module.exports = product;
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

        var rrp = req.body.rrp;

        var market_price = req.body.market_price;

        var quantity = req.body.quantity;

        var data = {
            name: name,
            catalogId : catalogId,
            description : description,
            rrp : rrp,
            market_price : market_price,
            quantity : quantity,
            status : 0
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
    put : function(req, res){
        var id = req.params.id;

        var name = req.body.name;

        var catalogId = req.body.catalogId;

        var description = req.body.description;

        var rrp = req.body.rrp;

        var market_price = req.body.market_price;

        var quantity = req.body.quantity;

        Product.findById(id, function(err, product){
            if(err) throw err;

            product.name = name;
            product.catalogId = catalogId;
            product.description = description;
            product.rrp = rrp;
            product.market_price = market_price;
            //product.modifiedAt = Date.now;

            product.save(function(err, catalog){
                if(err) throw err;

                res.json(product._id);
                res.end();
            });
        });

    },


    /***
     * Delete a product
     *
     * @param req
     * @param res
     */
    delete : function(req, res){
        var id = req.params.id;

        Product.findById(id, function(err, product){
            if(err) throw err;

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
    setStatus : function(req, res){

        var id = req.params.id;

        var status = req.body.status;

        Product.findById(id, function(err, product){
            if(err) throw err;

            if(product){

                product.setStatus(status, function(err, product){

                    res.end();
                });


            }else{
                throw 'Product not found';
            }
        });

    }
};


module.exports = product;
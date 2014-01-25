/**
 * Created with JetBrains PhpStorm.
 * User: wangfei0001
 * Date: 13-11-9
 * Time: PM9:45
 * To change this template use File | Settings | File Templates.
 */
var Price = require('../models/price');

var check = require('validator').check;

var price = {
    /***
     * Create a new price range
     *
     * @param req
     * @param res
     */
    post : function(req, res) {

        var currency = req.body.currency;

        var low = req.body.low;

        var high = req.body.high;


        try{
            check(currency, '货币' + currency + '不支持').isIn(Price.getCurrencies());

            check(low).isFloat();

            check(high).isFloat();

        }catch(e) {
            throw e;
        }

        var data = {
            currency: currency,
            low : low,
            high : high
        };
        new Price(data).save(function(err, price){
            if(err) throw err;

            res.json(price._id);
            res.end();
        });

    },


    /***
     * Get price details
     *
     * @param req
     * @param res
     */
    get : function(req, res){
        var id = req.params.id;


        Price.findById(id,function(err, price){
            if(err) throw err;

            res.json(price);
            res.end();
        });
    },


    /***
     * Delete a price range
     *
     * @param req
     * @param res
     */
    delete : function(req, res){
        var id = req.params.id;

        try{
            check(id).notNull();

        }catch (e){
            throw e;
        }

        Price.findById(id,function(err, price){

            if(err) throw err;

            price.remove();
            res.end();

        });



    },


    /***
     * Modify a price range
     *
     * @param req
     * @param res
     */
    put : function(req, res){
        var id = req.params.id;

        var currency = req.body.currency;

        var low = req.body.low;

        var high = req.body.high;

        try{
            check(currency, '货币' + currency + '不支持').isIn(Price.getCurrencies());

            check(low).isFloat();

            check(high).isFloat();

            check(id).notNull();

        }catch(e) {
            throw e;
        }


        Price.findById(id,function(err, price){
            if(err) throw err;

            price.currency = currency;

            price.low = low;

            price.high = high;

            price.save(function(err, price){
                if(err) throw err;

                res.json(price._id);
                res.end();
            });

        });

    },


    /***
     * Get Price range list
     *
     * @param req
     * @param res
     */
    list : function(req, res){
        Price.find(function(err, prices) {
            if(err) throw err;

            res.json(prices);
            res.end();
        });
    }


};



module.exports = price;
/**
 * Created with JetBrains PhpStorm.
 * User: wangfei0001
 * Date: 13-11-10
 * Time: PM1:47
 * To change this template use File | Settings | File Templates.
 */
var Address = require('../models/address');

var check = require('validator').check;


var address = {

    /***
     * Create a address
     *
     * @param req
     * @param res
     */
    post : function(req, res) {
        var name = req.body.name;

        var userid = req.params.userid;

        var company = req.body.company;

        var address1 = req.body.address1;

        var address2 = req.body.address2;

        var phone = req.body.phone;

        var mobile = req.body.mobile;

        var postcode = req.body.postcode;

        var isDefault = req.body.isDefault;


        var data = {
            name: name,
            company : company,
            address1: address1,
            address2: address2,
            phone: phone,
            mobile: mobile,
            postcode: postcode,
            userId: userid,
            isDefault: isDefault
        };

        new Address(data).save(function(err, address){
            if(err) throw err;

            res.json(address._id);
            res.end();
        });

    },


    /***
     * Get all of the addresses
     *
     * @param req
     * @param res
     */
    list : function(req, res){

        var userid = req.params.userid;

        Address.find({ userId : userid }, function(err, addresses) {
            if(err) throw err;

            res.json(addresses);
            res.end();
        });

    },


    /***
     * Delete the address
     *
     * @param req
     * @param res
     */
    delete : function(req, res){

        var userid = req.params.userid;

        var id = req.params.id;

        Address.findById(id,function(err, address){

            if(err) throw err;

            if(address){

                address.remove();
                res.end();
            }else{
                throw 'Address not found';
            }

        });

    },

    put : function(req, res){
        var id = req.params.id;

        var userid = req.params.userid;

        var name = req.body.name;

        var company = req.body.company;

        var address1 = req.body.address1;

        var address2 = req.body.address2;

        var phone = req.body.phone;

        var mobile = req.body.mobile;

        var postcode = req.body.postcode;

        var isDefault = req.body.isDefault;

        Address.findById(id,function(err, address){

            if(err) throw err;

            if(address){

                address.name = name;

                address.company = company;

                address.address1 = address1;

                address.address2 = address2;

                address.phone = phone;

                address.mobile = mobile;

                address.postcode = postcode;

                address.isDefault = isDefault;

                address.save(function(err, address){
                    if(err) throw err;

                    res.json(address._id);
                    res.end();
                });

            }else{
                throw 'Address not found';
            }

        });

    },

    setDefault : function(req, res){
        var id = req.params.id;

        var userid = req.params.userid;

        Address.findById(id,function(err, address){
            if(err) throw err;


            if(address){

                address.setDefault(function(err, address){
                    if(err) throw err;


                    //We need to change other addresses to false

                    res.json(address._id);
                    res.end();
                });

            }else{
                throw 'Address not found';
            }

        });

    }
};


module.exports = address;
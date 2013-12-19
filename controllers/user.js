/**
 * Created with JetBrains PhpStorm.
 * User: wangfei0001
 * Date: 13-11-9
 * Time: PM10:25
 * To change this template use File | Settings | File Templates.
 */
var User = require('../models/user.js');

var util = require('util');

var user = {
    /***
     * Create a catalog
     *
     * @param req
     * @param res
     */
    post : function(req, res) {

        req.assert('username', '6 ~ 12 charactuers required').len(6, 12);

        req.assert('password', '6 ~ 16 charactuers required').len(8, 16);

        req.assert('email', 'valid email required').isEmail();

        req.assert('firstname', 'firstname required').notEmpty();

        req.assert('lastname', 'lastname required').notEmpty();

        var errors = req.validationErrors();
        if (errors) {
            res.send('There have been validation errors: ' + util.inspect(errors), 400);
            return;
        }

        var data = {
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email
        };


        new User(data).save(function(err, user){
            if(err) throw err;

            res.json(user._id);
            res.end();
        });
    },


    /***
     * List all users
     *
     * @param req
     * @param res
     */
    list : function(req, res){
        User.find(function(err, users) {
            if(err) throw err;

            res.json(users);
            res.end();
        });
    },





    /***
     * Delete a user
     *
     * @param req
     * @param res
     */
    delete : function(req, res){

        var id = req.params.id;

        User.findById(id,function(err, user){

            if(err) throw err;

            user.deleted = true;

            user.save(function(err, result){
                if(err) throw err;


                res.end();
            });

        });


    },


    /***
     * Modify a user
     *
     * @param req
     * @param res
     */
    put : function(req, res){

        var id = req.params.id;


        var firstname = req.body.firstname;

        var lastname = req.body.lastname;

        var email = req.body.email;


        User.findById(id,function(err, user){
            if(err) throw err;

            user.firstname = firstname;

            user.lastname = lastname;

            user.email = email;

            user.save(function(err, user){
                if(err) throw err;

                res.json(user._id);
                res.end();
            });

        });
    },


    /***
     * Get User details
     *
     * @param req
     * @param res
     */
    get : function(req, res){
        var id = req.params.id;


        User.findById(id,function(err, user){
            if(err) throw err;

            res.json(user);
            res.end();
        });
    },


    /***
     * suspend 账号
     *
     * @param req
     * @param res
     */
    suspend : function(req, res){
        var id = req.params.id;
        if(!id || id == undefined) res.send(404);

        User.findById(id,function(err, user){
            if(err) throw err;

            user.status = 1;

            user.save(function(err, user){
                if(err) throw err;

                res.end();
            });

        });

    },


    /***
     * 重新激活账号
     *
     * @param req
     * @param res
     */
    active : function(req, res){
        var id = req.params.id;
        if(!id || id == undefined) res.send(404);

        User.findById(id,function(err, user){
            if(err) throw err;

            user.status = 0;

            user.save(function(err, user){
                if(err) throw err;

                res.end();
            });

        });

    },


    /***
     *
     * @param req
     * @param res
     */
    login : function(req, res){


    },


    /***
     *
     * @param req
     * @param res
     */
    logout : function(req, res){


    }

};

module.exports = user;
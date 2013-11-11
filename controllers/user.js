/**
 * Created with JetBrains PhpStorm.
 * User: wangfei0001
 * Date: 13-11-9
 * Time: PM10:25
 * To change this template use File | Settings | File Templates.
 */
var User = require('../models/user.js');

var user = {
    /***
     * Create a catalog
     *
     * @param req
     * @param res
     */
    post : function(req, res) {
        var username = req.body.username;

        var password = req.body.password;

        var firstname = req.body.firstname;

        var lastname = req.body.lastname;

        var email = req.body.email;


        var data = {
            username: username,
            password: password,
            firstname: firstname,
            lastname: lastname,
            email: email
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

            user.remove();
            res.end();

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
    }

};

module.exports = user;
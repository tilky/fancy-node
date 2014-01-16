/**
 * Created with JetBrains PhpStorm.
 * User: wangfei0001
 * Date: 14-1-16
 * Time: PM10:34
 * To change this template use File | Settings | File Templates.
 */
var util = require('util');

var facebook = require('../models/facebook');



var sns = {

    login : function(req, res, next) {

        var type = req.body.type;

        if(type == 'facebook'){
        var url = facebook.getLoginUrl({
            redirect_uri: 'http://localhost/#/login/done?type=facebook',
            cancel_url: 'http://localhost/#/login/cancel?type=facebook'
        });
//
        console.log(url);
//        facebook.api('/me', function(err, data) {
//            console.log(err, data);
//            res.end();
//        })

        }else if(type == 'weibo'){
            var weibo = require('../models/weibo');

            var user = { blogtype: 'weibo' };
            weibo.get_authorization_url(user, function(err, result){


                console.log(result);
                res.end();
            });

        }
    }

};


module.exports = sns;
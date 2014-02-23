/**
 * Created with JetBrains PhpStorm.
 * User: wangfei0001
 * Date: 13-11-9
 * Time: PM10:25
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

var moment = require('moment');

var userSchema = new Schema({
    username: String,
    email: String,
    firstname: String,
    lastname: String,
    password: String,
    status: {type: Number, default: 0},
    api_token: String,
    expiredAt: Date,
    deleted: {type: Boolean, default: false},
    createdAt: Date,
    modifiedAt: {type: Date, default: Date.now}
});


/***
 * Get Brief information for this user
 *
 * @return {Object}
 */
userSchema.methods.getBrief = function(){

    var self = this;

    return {
        user_id : self._id,
        username : self.username,
        image : 'http://thefancy-media-ec2.thefancy.com/UserImages/atrinhy_b697f85efbbc.jpg'
    };
};

userSchema.pre('save', function (next) {
//    if(this.parentId){
//        this.model('Catalog').find({ _id: this.parentId }, function(err, catalog){
//
//            if(catalog){
//                next();
//            }else{
//                next(new Error('Can not found the parent catalog'));
//            }
//
//        });
//    }else{
    next();
//    }
});

userSchema.statics.login = function(username, password, cb){
    var self = this;

    self.findOne({username: username}, function(err, user){
        if(err) return cb(err);

        if(!user) return cb('User not found');

        user.api_token = username;
        user.expiredAt = moment().format('YYYY-MM-DD HH:mm:ssZ');

        user.save(cb);
    });


};


module.exports = mongoose.model('User', userSchema);
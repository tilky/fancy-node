/**
 * Created with JetBrains PhpStorm.
 * User: wangfei0001
 * Date: 14-1-10
 * Time: PM11:34
 * To change this template use File | Settings | File Templates.
 */
var Thumbor = {

};

Thumbor.getUrl = function(path, width, height){
    var CryptoURL = require('ThumborJS').CryptoURL;

    var crypto = new CryptoURL('fancyclone', path);

    return crypto.resize(
        width,
        height
    ).withSmartCropping().toString();
}

module.exports = Thumbor;
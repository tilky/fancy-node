var express = require('express'),
        expressValidator = require('express-validator'),
            mongoose = require('mongoose'),
                nconf = require('nconf');


var app = module.exports.app = express();

mongoose.connect('mongodb://localhost/fancy');

nconf.file({ file: './config.json' });

global.nconf = nconf;


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};


/***
 * Register some global functions
 *
 * @param config
 * @return {*|String}
 */
global.getConfig = function(config){
    return global.nconf.get(config);
}

//console.log(global.getConfig('upload_path'));

//app.set('title','我的第一个nodejs程序');

// Middleware
//app.use(app.router); // you need this line so the .get etc. routes are run and if an error within, then the error is parsed to the ned middleware (your error reporter)

//app.use(function(err, req, res, next) {
//    if(!err) return next(); // you also need this line
//    console.log("error!!!" + err);
//    res.send("error!!!");
//});


//app.configure(function(){
//    app.use(express.bodyParser());
//    app.use(express.methodOverride());
//    app.use(app.router);
//});
app.use(allowCrossDomain);

app.use(express.static(__dirname + '/public'));

app.use(express.bodyParser());

app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
            , root    = namespace.shift()
            , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        };
    }
}));




// set up the RESTful API, handler methods are defined in api.js
var api = require('./controllers/api.js');


app.post('/api/v1/catalog', api.catalog.post);
app.get('/api/v1/catalog', api.catalog.list);
app.delete('/api/v1/catalog/:id', api.catalog.delete);
app.put('/api/v1/catalog/:id', api.catalog.put);
app.get('/api/v1/catalog/:id', api.catalog.get);

app.post('/api/v1/product', api.product.post);
app.get('/api/v1/product', api.product.list);
app.delete('/api/v1/product/:id', api.product.delete);
app.put('/api/v1/product/:id', api.product.put);
app.get('/api/v1/product/:id', api.product.get);

app.post('/api/v1/product/:id/status', api.product.setStatus);

app.get('/api/v1/product/:id/images', api.image.list)
app.post('/api/v1/product/:id/image', api.image.post);
app.delete('/api/v1/product/:id/image/:image_id', api.image.delete);


app.post('/api/v1/price', api.price.post);
app.get('/api/v1/price', api.price.list);
app.delete('/api/v1/price/:id', api.price.delete);
app.put('/api/v1/price/:id', api.price.put);
app.get('/api/v1/price/:id', api.price.get);

app.post('/api/v1/user', api.user.post);
app.get('/api/v1/user', api.user.list);
app.get('/api/v1/user/:id', api.user.get);
app.delete('/api/v1/user/:id', api.user.delete);
app.put('/api/v1/user/:id', api.user.put);

app.post('/api/v1/user/:id/suspend', api.user.suspend);
app.delete('/api/v1/user/:id/suspend', api.user.active);


app.post('/api/v1/user/login', api.user.login);
app.delete('/api/v1/user/login', api.user.logout);


app.post('/api/v1/user/:userid/address', api.address.post);
app.get('/api/v1/user/:userid/address', api.address.list);
app.delete('/api/v1/user/:userid/address/:id', api.address.delete);
app.put('/api/v1/user/:userid/address/:id', api.address.put);

app.post('/api/v1/user/:userid/address/:id/default', api.address.setDefault);


/***
 * Error handle function
 */
app.use(function(err, req, res, next){
    if(err.name == 'ValidationError'){
        var errors = [];
        var keys = Object.keys(err.errors);
        for(var i in err.errors){
            var entry = err.errors[i];
            errors.push({
                name: keys[i],
                error: entry.message,
                value: entry.value
            });
        }
        return res.send(JSON.stringify(errors), 400);
    }else{
        console.log('Exception: ' + err.stack);
        res.send(500);
    }
});

app.listen(3000);
console.log('Listening on port 3000');

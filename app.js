var express = require('express');
var mongoose = require('mongoose');
var app = express();

mongoose.connect('mongodb://localhost/fancy');

app.set('title','我的第一个nodejs程序');

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

app.use(express.static(__dirname + '/public'));

app.use(express.bodyParser());

//app.get('/hello.txt', function(req, res){
//
//  var body = 'Hello World 3\n';
//
//  body += app.get('title');
//  res.setHeader('Content-Type', 'text/plain');
//  res.setHeader('Content-Length', body.length);
//  res.end(body);
//});




// set up the RESTful API, handler methods are defined in api.js
var api = require('./controllers/api.js');

app.set('views', __dirname + '/views');

app.get('/', function(req, res){
    require('fs').readFile(__dirname + '/index.html', 'utf8', function(err, text){
        res.send(text);
    });
});

app.post('/catalog', api.catalog.post);
app.get('/catalog', api.catalog.list);
app.delete('/catalog/:id', api.catalog.delete);
app.put('/catalog/:id', api.catalog.put);

app.post('/product', api.product.post);
app.get('/product', api.product.list);
app.delete('/product/:id', api.product.delete);
app.put('/product/:id', api.product.put);

app.post('/product/:id/status', api.product.setStatus);

app.post('/price', api.price.post);
app.get('/price', api.price.list);
app.delete('/price/:id', api.price.delete);
app.put('/price/:id', api.price.put);


app.post('/user', api.user.post);
app.get('/user', api.user.list);
app.delete('/user/:id', api.user.delete);
app.put('/user/:id', api.user.put);

app.post('/user/:userid/address', api.address.post);
app.get('/user/:userid/address', api.address.list);
app.delete('/user/:userid/address/:id', api.address.delete);
app.put('/user/:userid/address/:id', api.address.put);

app.post('/user/:userid/address/:id/default', api.address.setDefault);

app.listen(3000);
console.log('Listening on port 3000');

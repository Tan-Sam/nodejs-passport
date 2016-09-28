var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

// Init app
var app = express();

// Connect with Mongo DB
mongoose.connect('mongodb://localhost/sm_backend');

// Init middel-ware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// View Engine
app.set( 'views', path.join(__dirname, 'views'));
app.set( 'view engine', 'jade');

// Setup sessions
app.use(session( { secret: 'ilovevdi'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Setup local-strategy
require('./config/passport')(passport);


// For all routes a user should be logged in except /login
app.all('*', function(req, res, next){
    if(req.isAuthenticated() || req.url === '/login') {
        return next();
    }

    res.redirect('/login')
});

// Routes
require('./routes/routes')(app, passport);

// listen
app.listen( 3000, function(){
    console.log('lisning on port 3000');
});


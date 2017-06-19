var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var nunjucks = require('nunjucks');
var expressNunjucks = require('express-nunjucks');

// Routes
var routes = {
    index: require('./routes/index'),
    portfolio: require('./routes/portfolio')
}

var app = express();
var isDev = app.get('env') === 'development';

app.set('remotePortfolio', require('./config/.remote-portfolio'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'njk');

var njk = expressNunjucks(app, {
    autoescape: true,
    express: app,
    noCache: isDev,
    watch: isDev,
    filters: {
        date: require('nunjucks-date'),
        dasherize: function(str) {
            return str.replace(/\s/g, '-');
        },
        padLeft: function(str, pad = '000') {
            return (pad + str).slice(-pad.length);
        },
        parseDimensions: function(str) {
            return str.split('--').reverse()[0];
        }
    }
});

app.set('x-powered-by', null);
// app.set('title', 'Brian Clark');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes.index);
app.use('/portfolio', routes.portfolio);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

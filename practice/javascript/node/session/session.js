var express = require('express')
    , path = require('path')
    , favicon = require('serve-favicon')
    , logger = require('morgan')
    //, cookieParser = require('cookie-parser')
    , bodyParser = require('body-parser')
    //, mongo = require("mongodb")
    , sessions = require("client-sessions")
    , csrf = require("csurf");

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// Make the source look nice
app.locals.pretty = true;

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// Don't know what this does
app.use(logger('dev'));
// For posting data?
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Probably don't need this
//app.use(cookieParser());
// For my public folder?
app.use(express.static(path.join(__dirname, 'public')));
// For cookies
app.use(sessions({
    cookieName: "session",
    secret: "8n9v89ytsdr8nt54ytnev4nbi",
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    httpOnly: true, // Makes sure there's an SSL connection
    secure: true, // Makes sure you can only login over an https connection
    ephemeral: true // Destroys cookies after you close the browser
}));

// csrf Token
app.use(csrf());

app.use('/', routes);
app.use('/users', users);

// Something with your password
app.use(function(req, res, next) {
    if (req.session && req.session.user) {
        User.findOne({ email: req.session.user.email }, function(err, user) {
            if (user) {
                req.user = user;
                delete req.user.password;
                req.session.user = req.user;
                res.locals.user = req.user;
            }
            next();
        });
    } else {
        next();
    }
});

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

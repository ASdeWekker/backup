// Imports
var express = require("express");
var path = require("path");
var mongodb = require("mongodb");
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var bcrypt = require("bcryptjs");
var csrf = require("csurf");
var clientsessions = require("client-sessions");

// Setting up imports and other requirements
var app = express();
var url = "mongodb://localhost:27017/darten";
var MongoClient = mongodb.MongoClient;
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// Set up a mongoose schema for registering a user so we can put a simple password on the page
var User = mongoose.model("User", new Schema({
    id: ObjectId,
    userName: { type: String, unique: true },
    password: String
}));
// Set up a mongoose schema for entering the players
var Players = mongoose.model("Players", new Schema({
    id: ObjectId,
    player1: String,
    numberOfPlayers: Number
}));

// Let mongoose connect to the database
mongoose.connect(url);

app.set("view engine", "pug");
app.locals.pretty = true;
app.use(express.static(path.join(__dirname, "public")));

// Middleware
// Figure out what this does
app.use(bodyparser.urlencoded({extended: true}));

// Set up cookie sessions
app.use(clientsessions({
    cookieName: "session",
    secret: "shjkfGHJD4356jfdlDJGK55kfjkdlk5GG",
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    httpOnly: true,
    secure: true,
    ephemeral: true
}));

// Just use csrf, for security
app.use(csrf());

// Deletes password from the cookie header, even though it's hashed
app.use(function(req, res, next) {
    if (req.session && req.session.user) {
        User.findOne({ email: req.session.user.email }, function(err, user) {
            if (user) {
                req.user = user;
                delete req.user.password;
                req.session.user = user;
                res.locals.user = user;
            }
            next();
        });
    } else {
        next();
    }
});

// Custom middleware functions
// Require to be logged in when visiting a page
function requireLogin(req, res, next) {
    if (!req.user) {
        res.redirect("/login");
    } else {
        next();
    }
}

// Routes
// Get the homepage
app.get("/", function(req, res) {
    res.render("index");
});

// GET and POST for the user creation page
// which should take darten as a username
// because it will be used
// as a hidden input field on the login page
app.get("/meepmorp", function(req, res) {
    res.render("meepmorp", { csrfToken: req.csrfToken() });
});
app.post("/meepmorp", function(req, res) {
    var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    var user = new User({
        userName: req.body.userName,
        password: hash
    });
    user.save(function(err) {
        if (err) {
            var err = "Dat heb je mooi verneukt";
            if (err.code === 11000) {
                error = "That username is already taken";
            }
            res.render("meepmorp", { error: error });
        } else {
            res.redirect("/");
        }
    });
});

// GET and POST for the login page
// just so you can enter scored secured
app.get("/login", function(req, res) {
    if (!req.user) {
        res.render("login", { csrfToken: req.csrfToken() });
    } else {
        res.redirect("/");
    }
});
app.post("/login", function(req, res) {
    User.findOne({ userName: req.body.userName }, function(err, user) {
        if (!user) {
            res.render("login");
        } else {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                req.session.user = user;
                res.redirect("/");
            } else {
                res.render("login", { error: "Verkeerd wachtwoord sukkel" });
            }
        }
    });
});

// GET and POST adding the users
app.get("/fleepflorp", function(req, res) {
    res.render("fleepflorp", { csrfToken: req.csrfToken() });
});
app.post("/fleepflorp", function(req, res) {
    var players = new Players({
        player1: req.body.player1,
        numberOfPlayers: req.body.numberOfPlayers
    });
    players.save(function(err) {
        if (err) {
            var err = "Dat heb je mooi verneukt";
            res.render("fleepflorp", { error: error });
        } else {
            res.redirect("/");
        }
    });
});

app.get("/joe", function(req, res) {
    req.session.reset();
    res.redirect("/login");
});

// Rest of the pages shouldn't exist so they get a 404
app.get("*", function(req, res) {
    res.render("404");
});

app.listen(3000);

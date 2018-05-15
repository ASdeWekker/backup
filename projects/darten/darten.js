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
var port = "3007";

var MongoClient = mongodb.MongoClient;
var user = process.env.MONGODB_RWU;
var ww = process.env.MONGODB_RWP;
var ip = "192.168.1.90";
var mongoport = "27017";
var db = "darten";
var colu = "users";
var colp = "player_count";

var url = "mongodb://" + user + ":" + ww + "@" + ip + ":" + port + "/" + db;

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

// Set up a mongoose schema for registering a user so we can put a simple password on the page
var User = mongoose.model("User", new Schema({
    id: ObjectId,
    userName: { type: String, unique: true },
    password: String
}));
// Set up a mongoose schema for entering the number of players
var Players = mongoose.model("Players", new Schema({
    id: ObjectId,
    player1: String,
    numberOfPlayers: Number
}));

// Let mongoose connect to the database
mongoose.connect(url, { useMongoClient: true });

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.locals.pretty = true;
app.use(express.static(path.join(__dirname, "public")));

// Middleware
// Figure out what this does
app.use(bodyparser.urlencoded({extended:true}));

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

// function to easily get a simple page.
function getPage(url, view, title) {
    app.get(url, function(req, res) {
        res.render(view, { title : title });
    });
}

// Routes
// Get the homepage
getPage("/", "index", "Home");

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
            var error = "Dat heb je mooi verneukt";
            if (err.code === 11000) {
                error = "That username is already taken";
                console.log(err);
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
getPage("*", "404", "Joe");


app.listen(port, function() {
    console.log(db.toUpperCase() + " is now listening on port: " + port);
});

// Imports
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var sessions = require("client-sessions");
var bcrypt = require("bcryptjs");
var csrf = require("csurf");
var port = 3005;
var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;
var user = process.env.MONGODB_RWU;
var ww = process.env.MONGODB_RWP;
var ip = "192.168.1.90";
var mongoport = 27017;
var db = "addpage";
var cola = "about";
var colu = "users";
var url = "mongodb://" + user + ":" + ww + "@" + ip + ":" + mongoport +"/" + db;

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var User = mongoose.model(colu, new Schema({
    id: ObjectId,
    firstName: String,
    lastName: String,
    email: { type: String, unique: true},
    password: String,
    data: String
}));

var app = express();

app.disable("x-powered-by");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.locals.pretty = true;

mongoose.connect(url, { useMongoClient: true });

// Middleware
app.use(bodyParser.urlencoded({extended:true}));

app.use(sessions({
    cookieName: "session",
    secret: "sgfhJUujyjtyju5Jyjey5j6756jukdR6ie4jFF5G7k",
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    httpOnly: true,
    secure: true,
    ephemeral: true
}));

app.use(csrf());//{cookie:true}));

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

function requireLogin(req, res, next) {
    if (!req.user) {
        res.redirect("/login");
    } else {
        next();
    }
}

function getMenu(req, res, next) {

}

// Routes
app.get("/", function(req, res) {
    res.render("index");
});

app.get("/stuff", function(req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log("Unable to connect to the server", err);
        } else {
            console.log("Connection established");
            var collection = db.collection("stuff");
            collection.find({}).toArray(function(err, result) {
                if (err) {
                    res.send(err);
                } else if (result.length) {
                    res.render("stuff", { "stuff" : result });
                } else {
                    res.send("No documents found");
                }
                db.close();
            });
        }
    });
})

app.get("/register", function(req, res) {
	if (!req.user) {
		res.render("register", { csrfToken: req.csrfToken() });
	} else {
		res.redirect("/dashboard");
	}
});

app.post("/register", function(req, res) {
    var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        data: req.body.data
    });
    user.save(function(err) {
        if (err) {
            var error = "Something bad happened! Try again";
            if (err.code === 11000) {
                error = "That email is already taken, try another one!";
            }
            res.render("register", {error:error});
        } else {
            res.redirect("/dashboard");
        }
    });
});

app.get("/login", function(req, res) {
	if (!req.user) {
		res.render("login", { csrfToken: req.csrfToken() });
	} else {
		res.redirect("/dashboard");
	}
});

app.post("/login", function(req, res) {
    User.findOne({email: req.body.email }, function(err, user) {
        if (!user) {
            res.render("login", { error: "Invalid email or password." });
        } else {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                req.session.user = user;
                res.redirect("/dashboard");
            } else {
                res.render("login", { error: "Invalid email or password" });
            }
        }
    });
});


app.get("/dashboard", requireLogin, function(req, res) {
    res.render("dashboard");
});

app.get("/dashboard/edit", requireLogin, function(req, res) {
    res.render("dashedit");
});

app.get("/logout", function(req, res) {
    req.session.reset();
    res.redirect("/");
});

app.get("*", function(req, res) {
    res.render("404");
});

// --------- TECHNICAL SERVER STUFF ---------

app.listen(port, function() {
    console.log("          " + db.toUpperCase() + " is now listening on port: " + port);
});
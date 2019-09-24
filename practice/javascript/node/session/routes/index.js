/*
 * REQUIREMENTSS
 */
var express = require("express")
    , router = express.Router()
    , mongodb = require("mongodb")
    , MongoClient = mongodb.MongoClient
    , user = process.env.MONGODB_RWU
    , ww = process.env.MONGODB_RWP
    , ip = "192.168.1.90"
    , mongoport = "27017"
    , db = "session"
    , cola = "about"
    , colu = "users"
    , url = "mongodb://" + user + ":" + ww + "@" + ip + ":" + mongoport + "/" + db
    , bcrypt = require("bcryptjs");

// Mongoose stuff you need
var mongoose = require("mongoose")
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

// Connect to mongoDB
mongoose.connect(url, { useMongoClient: true });

// Create new user schema
var User = mongoose.model(colu, new Schema({
    id: ObjectId,
    firstName: String,
    lastName: String,
    email: {type: String, unique: true },
    password: String
}));

/*
 * GET pages
 */

// Get the homepage
router.get("/", function(req, res) {
    res.render("index");
});

// display some text on the about page from the database
router.get("/about", function(req, res){
    MongoClient.connect(url, function(err, db){
        if(err){
            console.log("Unable to connect to the server", err);
        } else {
            console.log("Connection established");
            var collection = db.collection(cola);
            collection.find({}).toArray(function(err, result){
                if(err){
                    res.send(err);
                } else if(result.length){
                    res.render("about", { "pagetext" : result });
                } else {
                    res.send("No documents found");
                }
                db.close();
            });
        }
    });
});

// The stuff page
router.get("/stuff", function(req, res){
    res.render("stuff");
});

/*
 * LOGGING IN
 */
// Get the login page
router.get("/login", function(req, res){
    if (req.session && req.session.user) {
        User.findOne({ email: req.session.user.email }, function(err, user) {
            if (!user) {
                req.session.reset();
                res.render("login", { csrfToken: req.csrfToken() });
            } else {
                res.locals.user = user;
                res.redirect("dashboard");
            }
        });
    } else {
        res.render("login", { csrfToken: req.csrfToken() });
    }
});
// Log in a user
router.post("/login", function(req, res){
    User.findOne({ email: req.body.email}, function(err, user) {
        if (!user) {
            res.render("login", {
                error: "Invalid email or password",
                csrfToken: req.csrfToken()
            });
        } else {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                req.session.user = user;
                res.redirect("/dashboard");
            } else {
                res.render("login", {
                    error: "Invalid email or password",
                    csrfToken: req.csrfToken()
                });
            }
        }
    });
});

/*
 * REGISTRATION
 */
// Get the register page
router.get("/register", function(req, res){
    if (req.session && req.session.user) {
        User.findOne({ email: req.session.user.email }, function(err, user) {
            if (!user) {
                req.session.reset();
                res.render("register", { csrfToken: req.csrfToken() });
            } else {
                res.locals.user = user;
                res.redirect("dashboard");
            }
        });
    } else {
        res.render("register", { csrfToken: req.csrfToken() });
    }
});
// Save the info registered
router.post("/register", function(req, res){
    var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash
    });
    user.save(function(err){
        if(err){
            var error = "Somthing bad happened, try again";
            if(err.code === 11000) {
                error = "That email is already taken";
            }
            res.render("register", { error: error });
        } else {
            res.redirect("/dashboard");
        }
    })
});

// Get the dashboard page
router.get("/dashboard", function(req, res){
    if (req.session && req.session.user) {
        /*User.findOne({ email: req.session.user.email }).then(function(user) {
            if (!user) {
                req.session.reset();
                res.redirect("/login");
            } else {
                res.locals.user = user;
                res.render("dashboard");
            }
        }).catch((err) => {
            console.log(err);
            res.redirect("/");
        });*/
        User.findOne({ email: req.session.user.email }, function(err, user) {
            if (!user) {
                req.session.reset();
                res.redirect("/login");
            } else {
                res.locals.user = user;
                res.render("dashboard");
            }
        });
    } else {
        res.redirect("/login");
    }
});

// Return to the homescreen when you log out
router.get("/logout", function(req, res){
    req.session.reset();
    res.redirect("/");
});

router.get("/sukkol", function(req, res){
    res.render("sukkol");
});

module.exports = router;

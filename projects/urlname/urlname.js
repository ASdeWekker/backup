// ---------- SET UP STUFF ----------

// Required packages
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const mongodb = require("mongodb");
const mongoose = require("mongoose");

// Declare the app
const app = express();

// Make sure nothing about the server is put in the header
app.disable("x-powered-by");

// Set up some extra mongodb && mongoose stuff
const MongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017/urlname";
const schema = mongoose.Schema;
const ObjectId = schema.ObjectId;

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
// And make the source look nice
app.locals.pretty = true;

// ---------- MIDDLEWARE ----------

// For my public folder?
app.use(express.static(path.join(__dirname, "public")));

// Uncomment after placing favicon in public
//app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
    
// Set up jQuery & Bootstrap
app.use("/jquery", express.static(__dirname + "/node_modules/jquery/dist/"));
app.use("/bootstrap", express.static(__dirname + "/node_modules/bootstrap/dist/"));

// ---------- GET PAGES ----------

// Home page
app.get("/", function(req, res) {
    res.render("index", {
        title : "Home"
    });
});

app.get("/index2", function(req, res) {
    res.render("index2", {
        title : "Home"
    });
});

// Check if the dababase works
app.get("/database", function(req, res) {
    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log("Unable to connect to the server", err);
        } else {
            console.log("Connection established");
            var collection = db.collection("test");
            collection.find({}).toArray(function(err, result) {
                if (err) {
                    res.render("error", {
                        error : err
                    });
                } else if (result.length) {
                    res.render("database", {
                        teststuff : result
                    });
                } else {
                    res.render("error", {
                        error : "No documents found"
                    });
                }
                db.close();
            });
        }
    });
});

// Request database entries
app.post("/dbtest", function(req, res) {
    console.log("It works!");
});

// ---------- ERROR HANDLING ----------

// 404 page
app.get("*", function(req, res) {
    res.render("404");
})

// Development error handler
// Will print stacktrace, whatever that is
if (app.get("env") === "development") {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render("error", {
            message: err.message,
            error: err
        });
    });
}

// Production error handler
// No stacktraces(???) leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
        message: err.message,
        error: {}
    });
});

// ---------- PORT CONFIGURATION ----------

// Open the port for the app to work on
app.listen(3000, function() {
    console.log("UrlName is listening on port 3000");
});

// ----------  ----------
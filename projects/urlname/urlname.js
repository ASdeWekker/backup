// -------------- TO DO --------------
// Change from scss to sass.
// Change folder style to use numbers.


// ---------- SET UP STUFF ----------

// Required packages
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const mongodb = require("mongodb");
const mongoose = require("mongoose");

// Declare the app
const app = express();
const port = "3008";

// Make sure nothing about the server is put in the header
app.disable("x-powered-by");

// Set up some extra mongodb && mongoose stuff
const MongoClient = mongodb.MongoClient;
const user = process.env.MONGODB_RWU;
const ww = process.env.MONGODB_RWP;
const ip = "192.168.1.90";
const mongoport = "27017";
const db = "urlname";
const url = "mongodb://" + user + ":" + ww + "@" + ip + ":" + mongoport + "/" + db;
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
// Also move these to the public folder for use with sublime.
app.use("/jquery", express.static(__dirname + "/node_modules/jquery/dist/"));
app.use("/bootstrap", express.static(__dirname + "/node_modules/bootstrap/dist/"));

// ---------- GET PAGES ----------

// A simple getPage function.
function getPage(url, view, title) {
    app.get(url, (req, res) => {
        res.render(view, { title : title });
    });
}

// Home page
getPage("/", "index", "Home");

// The second index page.
getPage("/index2", "index2", "Home2");

// Check if the dababase works
app.get("/database", (req, res) => {
    MongoClient.connect(url, (err, db) => {
        if (err) {
            console.log("Unable to connect to the server", err);
        } else {
            console.log("Connection established");
            var collection = db.collection("test");
            collection.find({}).toArray((err, result) => {
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

// 404 page.
// Change the view to add a title.
getPage("*", "404", "404 Not found");

// Development error handler
// Will print stacktrace, whatever that is
if (app.get("env") === "development") {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render("error", {
            message: err.message,
            error: err
        });
    });
}

// Production error handler
// No stacktraces(???) leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render("error", {
        message: err.message,
        error: {}
    });
});

// ---------- PORT CONFIGURATION ----------

// Open the port for the app to work on
app.listen(port, () => {
    console.log(db.toUpperCase() + " is now listening on port: " + port);
});

// ----------  ----------

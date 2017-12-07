// -------------------- SET UP STUFF --------------------
// -------------------- SET UP STUFF --------------------
// -------------------- SET UP STUFF --------------------

// Required packages
const express = require("express");
const favicon = require("serve-favicon");
const mongodb = require("mongodb");
const path = require("path");

// Declare the app
const app = express();

// Make sure nothing about the server is put in the header
app.disable("x-powered-by");

// Setup mongodb
const MongoClient = mongodb.MongoClient;
const ip = "localhost";
const port = "27017";
const db = "speedtest";
const url = "mongodb://" + ip + ":" + port + "/" + db;

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
// and make the source look nice
//app.locals.pretty = true;

// -------------------- MIDDLEWARE ----------------------
// -------------------- MIDDLEWARE ----------------------
// -------------------- MIDDLEWARE ----------------------

// Use your public folder
app.use(express.static(path.join(__dirname, "public")));

// Favicon
// Uncomment after placing favicon in public
//app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

// Setup jQuery and Bootstrap
app.use("/jquery", express.static(__dirname + "node_modules/jquery/dist/"));
app.use("/bootstrap", express.static(__dirname + "node_modules/bootstrap/dist/"));

// -------------------- GET PAGES -----------------------
// -------------------- GET PAGES -----------------------
// -------------------- GET PAGES -----------------------

// Homepage
app.get("/", function(req, res) {
    res.render("index");
});

// -------------------- ERROR HANDLING ------------------
// -------------------- ERROR HANDLING ------------------
// -------------------- ERROR HANDLING ------------------

// 404 page
app.get("*", function(req, res) {
    res.render("404");
});

// -------------------- PORT CONFIG ---------------------
// -------------------- PORT CONFIG ---------------------
// -------------------- PORT CONFIG ---------------------

// Open the port for the app to work on
app.listen(3009, function() {
    console.log("SpeeedTest is listening on port 3009");
});

// -------------------- ============ --------------------

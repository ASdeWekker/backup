
// -------------- SET UP STUFF --------------

// Required packages.
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const mongodb = require("mongodb");
const exec = require("child_process").exec;

// Set up mongodb connect url.
const user = process.env.MONGODB_RWU;
const ww = process.env.MONGODB_RWP;
const mongoport = 27017;
const ip = "192.168.1.90";
const db = "nodelpage";
const collinks = "links";
const MongoClient = mongodb.MongoClient;
const mongourl = "mongodb://" + user + ":" + ww + "@" + ip + ":" + mongoport + "/" + db;

// Declare the app and set the port.
const app = express();
const port = 3099;

// Stop anything from being shown about the server.
app.disable("x-powered-by");

// Set the folder for the pug files and make the source pretty.
app.set("views", path.join(__dirname, "0-views"));
app.set("view engine", "pug");
app.locals.pretty = true;


// --------------- MIDDLEWARE ---------------

// Set the public folder
app.use(express.static(path.join(__dirname, "1-public")));
// Set the favicon.
app.use(favicon(path.join(__dirname, "1-public", "favicon.png")));


// --------------- GET  PAGES ---------------

// Function to easily get the page.
function getPage(url, view, title) {
    app.get(url, (req, res) => {
        res.render(view, { title : title });
    });
}

// The landing page.
app.get("/", (req, res) => {
    // Get the hostname from the url.
    var urlbar = req.headers.host.split(":");
    MongoClient.connect(mongourl, (err, db) => {
        if (err) {
            console.log("Unable to connect to the server");
        } else {
            console.log("Connection established");
            var linkcol = db.collection(collinks);
            linkcol.find({}).sort({url:1}).toArray((err, result) => {
                if (err) {
                    res.render("error", { // Change to error pug later.
                        error : err
                    });
                } else if (result.length) {
                    res.render("index", {
                        links : result,
                        // Pass through the hostname to easily switch between env.
                        url : urlbar[0]
                    });
                } else {
                    res.render("error", { // Change to error later.
                        error : "No documents found"
                    });
                }
                db.close();
            });
        }
    });
});

// Wake my PC.
app.get("/wol", (req, res) => {
    exec("wolpc", (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else if (stderr) {
            console.log(stderr);
            res.redirect("/");
        } else {
            console.log(stdout);
            res.redirect("/");
        }
    })
})

// Get the 404 page.
getPage("*", "404", "Not found");


// --------- TECHNICAL SERVER STUFF ---------

// Make the app listen to the right port.
app.listen(port, () => {
    console.log("      " + db.toUpperCase() + " is now listening on port: " + port);
});

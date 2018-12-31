// ----------------------- TO DO ------------------------
//
// DONE == Debug photo styling issue chrome mobile.
// Add some test info from the db.
// html height is bigger, set no scroll and change body height.
//
// Get two extra divs, div1 > div2 > .container div2 is bigger than div1
// Maybe div2 and container are equals and div2 spans the entire page
// plus 60 pixels for the chrome bar.
// div2 is 60 pixels longer than div1 and div1 is overflow hidden.

// -------------------- SET UP STUFF --------------------

// Required packages
const express = require("express")
const favicon = require("serve-favicon")
const mongodb = require("mongodb")
const path = require("path")

// Declare the ap
const app = express()
const port = 3009

// Make sure nothing about the server is put in the header
app.disable("x-powered-by")

// Setup mongodb stuff.
const MongoClient = mongodb.MongoClient
const user = process.env.MONGODB_RWU
const ww = process.env.MONGODB_RWP
const ip = "192.168.1.90"
const mongoport = 27017
const db = "speedtest"
const url = "mongodb://" + user + ":" + ww + "@" + ip + ":" + port + "/" + db

// View engine setup
app.set("views", path.join(__dirname, "0-views"))
app.set("view engine", "pug")
// and make the source look nice
app.locals.pretty = true

// -------------------- MIDDLEWARE ----------------------
// -------------------- MIDDLEWARE ----------------------
// -------------------- MIDDLEWARE ----------------------

// Use your public folder
app.use(express.static(path.join(__dirname, "1-public")))

// Favicon
// Uncomment after placing favicon in public
app.use(favicon(path.join(__dirname, "1-public", "favicon.ico")))

// Setup jQuery and Bootstrap
// Maybe moves these to public as sublime cannot see node_modules.
app.use("/jquery", express.static(__dirname + "node_modules/jquery/dist/"))
app.use("/bootstrap", express.static(__dirname + "node_modules/bootstrap/dist/"))

// -------------------- GET PAGES -----------------------
// -------------------- GET PAGES -----------------------
// -------------------- GET PAGES -----------------------

// A simple getPage function.
function getPage(url, view, text) {
    app.get(url, (req, res) => {
        res.render(view, { text : text })
    });
}

// The homepage.
getPage("/", "index", "Welcome to SpeedTest.")

// The temporary results page.
getPage("/results", "results", "Here are some results.")

// -------------------- ERROR HANDLING ------------------
// -------------------- ERROR HANDLING ------------------
// -------------------- ERROR HANDLING ------------------

// 404 page
getPage("*", "404", "Page not found.")

// -------------------- PORT CONFIG ---------------------
// -------------------- PORT CONFIG ---------------------
// -------------------- PORT CONFIG ---------------------

// Open the port for the app to work on
app.listen(port, () => {
    console.log("      " + db.toUpperCase() + " is now listening on port: " + port)
});

// -------------------- ============ --------------------
// That was all.

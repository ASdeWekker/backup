// This file will be called by ./config/server.js

// Dependencies.
express = require("express")
const bodyparser = require("body-parser")

// Declare the route(s).
const indexRouter = require("./routes/index")

// Call the app with express.
const app = express()

// Disable the server info.
app.disable("x-powered-by")

// Add body parser for the forms.
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))


// Call the routes.
app.use("/api", indexRouter)


module.exports = app

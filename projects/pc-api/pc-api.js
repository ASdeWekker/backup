// Deps.
const express = require("express")

// Declare routes.
const indexRouter = require("./routes/index")

// Call the app with express.
const app = express()

// Disable the serverinfo.
app.disable("x-powered-by")

// Call the route(s).
app.use("/api", indexRouter)

module.exports = app
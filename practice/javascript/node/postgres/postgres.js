// ===== THIS FILES WILL BE CALLED BY 2-bin/postgres =====

// The dependencies.
const createError = require("http-errors")
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const bodyparser = require("body-parser")
//const watchr = require("watchr")

// Declare the routes
const indexRouter = require("./3-routes/index")
const todoRouter = require("./3-routes/todo")
// Call the app with express.
const app = express()

// view engine setup.
app.set("views", path.join(__dirname, "0-views"))
app.set("view engine", "pug")
app.locals.pretty = true

// Don't show anything about the server in the header.
app.disable("x-powered-by")
// A logger for express, from morgan package.
app.use(logger("dev"))
// Use JSON
app.use(bodyparser.json())
// Send encoded urls through.
app.use(bodyparser.urlencoded({ extended: false }))
// Cookies.
app.use(cookieParser())

// Declare the public map.
app.use(express.static(path.join(__dirname, "1-public")))

app.use("/", indexRouter)
app.use("/todo", todoRouter)

app.get("/tea", (req, res, next) => {
    next(createError(418, "Im A Teapot"))
})

// catch 404 and forward to error handler.
app.use( (req, res, next) => {
  next(createError(404))
})

// error handler
app.use( (err, req, res, next) => {
  // set locals, only providing error in development.
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page.
  res.status(err.status || 500)
  res.render("error")
})

module.exports = app

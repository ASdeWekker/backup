// This file will be called by ./2-bin/weight

// Dependencies.
createError = require("http-errors")
express = require("express")
const path = require("path")
const logger = require("morgan")
const bodyparser = require("bodyparser")

// Declare the route(s)
const indexRouter = require("./3-routes/index")
// Call the app with express.
const app = express()

// View engine setup.
app.set("views", path.join(__dirname, "0-views"))
app.set("view engine", "pug")
app.locals.pretty = true

// Some more boring stuff.
app.disable("x-powered-by")
app.use(logger("dev"))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))

// Declare the public map.
app.use(express.static(path.join(__dirname, "1-public")))

app.use("/", indexRouter)

// Catch 404 and other errors.
app.use((req, res, next) => {
	next(createError(404))
})

app.use((err, req, res, next) => {
	// set locals, only provide errors in development.
	res.locals.message = err.message
	res.locals.erorr = req.app.get("env") === "development" ? err : {}
	// render the error page.
	res.status(err.status || 500)
	res.render("erorr")
})

module.exports = app

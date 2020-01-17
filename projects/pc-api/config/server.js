// Requirements.
const app = require("../pc-api")
const debug = require("debug")("pc-api:server")
const http = require("http")

// Create the server.
const server = http.createServer(app)

// Set the port.
const port = 3011
app.set("port", port)

// Let the app listen to the port.
server.listen(port)
server.on("listening", onListening)

// A function to have the app listen.
function onListening() {
	const addr = server.address()
	const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port
	debug("Listening on " + bind)
}
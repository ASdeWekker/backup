const app = require("../weight")
const debug = require("debug")("weight:server")
const http = require("http")

const server = http.createServer(app)

const port = 3010
app.set("port", port)

server.listen(port)
server.on("listening", onListening)

function onListening() {
	const addr = server.address()
	const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port
	debug("Listening on " + bind)
}

// Deps.
const express = require("express")
const jwt = require("jsonwebtoken")
const bodyparser = require("body-parser")
const cookieparser = require("cookie-parser")
const nodemailer = require("nodemailer")
require("dotenv").config({ path: "/var/www/html/penp/practice/javascript/node/auth-jwt/.env" })

// Set the port.
const port = 3012

// Nodemailer connection options.
let transporter = nodemailer.createTransport({
	host: process.env.MAILHOST,
	port: process.env.MAILPORT,
	secure: true,
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASS
	}
})

// Declare the app.
const app = express()

// Some middleware for cookies and form data.
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(cookieparser())
// Turn off server info.
app.disable("x-powered-by")

// A middleware function to check if you're authorized to look at the endpoint.
function auth(req, res, next) {
	console.log(req.cookies)
	if (typeof req.cookies["token"] !== "undefined") {
		let token = req.cookies["token"]
		let privateKey = process.env.SECRETKEY
		jwt.verify(token, privateKey, (user, err) => {
			if (err) {
				res.status(403).json({ "message": "You're not authorized" })
				console.log(err)
			}
			console.log(jwt.decode(token))
			return next()
		})
	} else {
		console.log("Not Authorized")
		res.redirect("/login")
	}
}

// GET for root, you do need to be authenticated though.
app.get("/", auth, (req, res) => {
	res.json({ "message":  "hello world, you need a token to get in here." })
})

// GET and POST route for login.
app.route("/login")
	// The GET page will ask you to enter your email.
	.get((req, res) => {
		res.json({ "message": "Enter your e-mail adres and we will send you a token" })})
	// The POST page will sign a JWT and send it via the mail
	.post((req, res) => {
		let email = req.body.email
		let privateKey = process.env.SECRETKEY
		let token = jwt.sign({ expiresIn: "10m", email: email }, privateKey, { algorithm: "HS512" })
		let mailOptions = { // Nodemailer email options containing the email header and body.
			from: "info@dewekker.dev",
			to: email,
			subject: "Hier is je token.",
			text: `Hier is de link! Log maar lekker in bij localhost: http://localhost:${port}/jwt/${token} Bij aad: http://10.8.0.4:${port}/jwt/${token} Of bij serge: http://10.8.0.5:${port}/jwt/${token}`,
			html: `<p>Hier is de link!<br />Log maar lekker in bij <a href='http://localhost:${port}/jwt/${token}'>localhost</a>.</p><p>Bij <a href='http://10.8.0.4:${port}/jwt/${token}'>aad</a>.</p><p>Of bij <a href='http://10.8.0.5:${port}/jwt/${token}'>serge</a>.</p><p>De link is als volgt<br /><pre>/jwt/${token}</pre></p>`
		}
		transporter.sendMail(mailOptions, (err, info) => {
			if (err) {
				console.log(err)
				res.json({ "message": "Something went wrong..." })
			} else {
				console.log(info)
				res.json({ "message": "Token has been sent via mail" })
			}
		})})

// GET to put the token send in the mail in a cookie.
app.get("/jwt/:token", (req, res) => {
	console.log(req.params.token)
	res.cookie(
		"token",
		req.params.token, {
			expires: new Date(Date.now() + 1000 * 60 * 10),
			// secure: true,
			// httpOnly: true 
		}).redirect(301, "/")
})

// Run the server.
app.listen(port, () => {
	console.log("App is running")
})
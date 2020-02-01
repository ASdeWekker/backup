// Deps.
const express = require("express")
const jwt = require("jsonwebtoken")
const bodyparser = require("body-parser")
const cookieparser = require("cookie-parser")
const nodemailer = require("nodemailer")

// Set the port.
const port = 3012

// Nodemailer connection options.
const transporter = nodemailer.createTransport({
	host: process.env.JWTMAILHOST,
	port: process.env.JWTMAILPORT,
	secure: true,
	auth: {
		user: process.env.JWTEMAIL,
		pass: process.env.JWTPASS
	}
})

// The secret key.
const privateKey = process.env.JWTSECRETKEY
// Expiration time for the cookie and the token.
let expTime = 60 * 1

// Declare the app.
const app = express()

// Some middleware for cookies and form data.
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(cookieparser())
// Turn off server info.
app.disable("x-powered-by")

// A small date function to make everything a bit more readable.
function dateFormat(date) {
	let dateStringOptions = { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" }
	return new Date(date).toLocaleDateString("nl-NL", dateStringOptions)
}

// A middleware function to check if you're authorized to look at the endpoint.
function auth(req, res, next) {
	if (typeof req.cookies["token"] !== "undefined") {
		let token = req.cookies["token"]
		jwt.verify(token, privateKey, (err, user) => {
			if (err) {
				console.log("Authorization error, more info below")
				res.status(403).json({ "message": "You're not authorized" })
				if (err.exp <= Date.now()) {
					console.log("The JWT is too old")
				} else {
					console.log("JWT authorization error:")
					console.log(err)
				}
			} else {
				let dt = jwt.decode(token)
				console.log("Logged in with the following token:")
				console.log(`email: ${dt.email}, iat: ${dateFormat(1000 * dt.iat)}, exp: ${dateFormat(1000 * dt.exp)}`)
				return next()
			}
		})
	} else {
		console.log("Not authorized, get a valid token.")
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
		let token = jwt.sign({ email: process.env.JWTEMAIL }, privateKey, { expiresIn: expTime, algorithm: "HS512" })
		let mailOptions = { // Nodemailer email options containing the email header and body.
			from: "info@dewekker.dev",
			to: process.env.JWTEMAIL,
			subject: "Hier is je token.",
			text: `Hier is de cookie: /jwt/${token}`,
			html: `
				<style>body{background:#333;color:#ddd;}</style>
				<p>Hier is de link!</p>
				<p>Log maar lekker in bij 
					<a href='http://localhost:${port}/jwt/${token}'>localhost</a>.<br />
					De link is als volgt<br />
					<pre>/jwt/${token}</pre>
				</p>`
		}
		transporter.sendMail(mailOptions, (err, info) => {
			if (err) {
				console.log("Nodemailer sendMail error:")
				console.log(err)
				res.json({ "message": "Something went wrong..." })
			} else {
				console.log(`A token has been sent at ${dateFormat(Date.now())}`)
				res.json({ "message": "Token has been sent via mail" })
			}
		})})

// GET endpoint for the cookie you've received in the mail.
app.get("/jwt/:token", (req, res) => {
	let cookieDate = new Date(Date.now() + 1000 * expTime)
	console.log(`This cookie is valid until ${dateFormat(cookieDate)}`)
	res.cookie(
		"token",
		req.params.token, {
			expires: cookieDate,
			// secure: true,
			httpOnly: true 
		}).redirect(301, "/")
})

// GET endpoint to clear the set cookie.
app.get("/logout", (req, res) => {
	res.clearCookie("token").redirect(301, "/")
})

// Run the server.
app.listen(port, () => {
	console.log("App is running")
})
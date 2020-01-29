const express = require("express")
const jwt = require("jsonwebtoken")
const bodyparser = require("body-parser")
const cookieparser = require("cookie-parser")
const nodemailer = require("nodemailer")
require("dotenv").config({ path: "/var/www/html/penp/practice/javascript/node/auth-jwt/.env" })

const port = 3012

let transporter = nodemailer.createTransport({
	host: process.env.MAILHOST,
	port: process.env.MAILPORT,
	secure: true,
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASS
	}
})

const app = express()

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(cookieparser())

app.disable("x-powered-by")

function auth(req, res, next) {
	if (typeof req.cookies["token"] !== "undefined") {
		let token = req.cookies["token"]
		let privateKey = process.env.SECRETKEY
		jwt.verify(token, privateKey, (err, user) => {
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

app.get("/", auth, (req, res) => {
	res.json({ "message":  "hello world, you need a token to get in here." })
})

app.route("/login")
	.get((req, res) => {
		res.json({ "message": "Enter your e-mail adres and we will send you a token" })})
	.post((req, res) => {
		let email = req.body.email
		let privateKey = process.env.SECRETKEY
		let token = jwt.sign({ expiresIn: "10m", email: email }, privateKey, { algorithm: "HS512" })
		let mailOptions = {
			from: "info@dewekker.dev",
			to: email,
			subject: "Hier is je token.",
			text: `Hier is de link! Log maar lekker in bij localhost: http://localhost:${port}/verify/${token} Bij aad: http://10.8.0.4:${port}/verify/${token} Of bij serge: http://10.8.0.5:${port}/verify/${token}`,
			html: `<p>Hier is de link!<br />Log maar lekker in bij <a href='http://localhost:${port}/verify/${token}'>localhost</a></p><p>Bij: <a href='http://10.8.0.4:${port}/verify/${token}'>aad</a></p><p>Of bij: <a href='http://10.8.0.5:${port}/verify/${token}'>serge</a></p><p>De link is als volgt: <pre>/verify/${token}</pre></p>`

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

app.get("/verify/:token", (req, res) => {
	res.cookie("token", req.params.token, { maxAge: 1000 * 60 * 10, secure: true, httpOnly: true }).redirect("/")
})

app.listen(port, () => {
	console.log("App is running")
})

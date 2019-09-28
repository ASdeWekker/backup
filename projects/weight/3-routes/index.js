// This file will be called by weight.js

// Dependencies.
const express = require("express")
const router = express.Router()
const { Pool } = require("pg")

// Connection URI.
const connStr = "postgresql://" + process.env.PSQLU + ":" + process.env.PSQLW + "@192.168.1.90:5432/weight"
// Connect to a new pool.
const pool = new Pool({ connectionString: connStr })
pool.connect()
// Queries.
const getWeight = "select * from weight order by date desc"
const postWeightWithNotes = "insert into weight (weight_val, date, notes) values ($1, $2, $3)"
const postWeight = "insert into weight (weight_val, date) value ($1, $2)"

// Get the one and only page.

// Home page.
router.get("/", (req, res, next) => {
	pool.query(getWeight).then(data => {
		res.render("index", { data: data })
	}).catch(e => console.error(e.stack))
})

router.post("/post", (req, res, next) => {
	let { weight_val, date, notes } = req.body
	rearrangedDate = date.split("-")
	date = rearrangedDate[2] + "-" + rearrangedDate[1] + "-" + rearrangedDate[0]
	// pool.query(notes ? postWeightWithNotes : postWeight, [weight_val, date, notes ? notes : null]).then(data => {
	pool.query(postWeightWithNotes, [weight_val, date, notes]).then(data => {
		res.redirect("/")
	}).catch(e => console.error(e.stack))
})

module.exports = router

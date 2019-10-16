// This file will be called by ../weight.js

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
const postWeight = "insert into weight (weight_val_new, date_new, notes) values ($1, $2, $3)"


// Home page.
router.route("/weight")
	.get((req, res) => {
		pool.query(getWeight)
			.then(data => res.json(data))
			.catch(e => console.error(e.stack))})
	.post((req, res) => {
		let { weight_val, notes } = req.body
		pool.query(postWeightWithNotes, [weight_val, new Date(), notes])
			.then(data => res.json(data))
			.catch(e => console.error(e.stack))})


module.exports = router

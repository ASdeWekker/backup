// This file will be called by ../weight.js

// Dependencies.
const express = require("express")
const router = express.Router()
const { Pool } = require("pg")
const connStr = require("../config/connection").connectionString

// Connect to a new pool.
const pool = new Pool({ connectionString: connStr })
pool.connect()

// Queries.
const getWeight = "select * from weight order by date desc"
const postWeight = "insert into weight (weight_val_new, date_new, notes) values ($1, $2, $3)"


// A route to GET and POST weight.
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

// This file will be called by ../weight.js

// Dependencies.
const express = require("express")
const router = express.Router()
const { Pool } = require("pg")
const connStr = require("../config/connection").connectionString
const queries = require("../config/queries")

// Connect to a new pool.
const pool = new Pool({ connectionString: connStr })
pool.connect()


// A route to GET and POST weight.
router.route("/weight")
	.get((req, res) => {
		pool.query(queries.getWeight)
			.then(data => res.json(data.rows))
			.catch(e => console.error(e.stack))})
	.post((req, res) => {
		let { weight_val, date, notes } = req.body
		pool.query(queries.postWeight, [weight_val, date, notes])
			.then(data => res.json(data))
			.catch(e => console.error(e.stack))})


module.exports = router

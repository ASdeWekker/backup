// This file will be called by ../weight.js

// Dependencies.
const express = require("express")
const router = express.Router()
const { Client } = require("pg")
const connStr = require("../config/connection").connectionString
const queries = require("../config/queries")

// Connect to a new client.
const client = new Client({ connectionString: connStr })
client.connect()


// A route to GET and POST weight.
router.route("/weight")
	.get((req, res) => {
		client.query(queries.getWeight)
			.then(data => res.json(data.rows))
			.catch(e => console.error(e.stack))})
	.post((req, res) => {
		let { weight_val, date, notes } = req.body
		client.query(queries.postWeight, [weight_val, date, notes])
			.then(data => res.json(data)) // Make a console log saying that you've inserted data.
			.catch(e => console.error(e.stack))})


module.exports = router

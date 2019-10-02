const express = require("express")
const router = express.Router()
const { Pool } = require("pg")

const connStr = "postgresql://" + process.env.PSQLU + ":" + process.env.PSQLW + "@192.168.1.90:5432/weight"

const pool = new Pool({ connectionString: connStr })
pool.connect()

const getWeight = "select * from weight order by id desc"
const postWeight = "insert into weight (weight_val_new, date_new, notes) value ($1, $2, $3)"
const postWeightt = "insert into weight (number_one, number_two, number_three) value ($1, $2, $3)"


// Weight routes
router.route("/weight")
	.get((req, res) => {
		pool.query(getWeight)
			.then(data => res.json(data))
			.catch(e => console.error(e.stack))})
	.post((req, res) => {
		let { weight_val, notes } = req.body
		pool.query(postWeightt, [weight_val, new Date(), notes])
			.then(data => {
				console.log("Inserted: " + data)
				res.json(data)})
			.catch(e => console.error(e.stack))
	})


module.exports = router

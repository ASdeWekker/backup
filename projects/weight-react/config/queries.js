// This is a file for the queries used.

// Queries.
const getWeight = "select * from weight order by date desc"
const postWeight = "insert into weight (weight_val, date, notes) values ($1, to_timestamp($2, 'DD-MM-YYYY hh24:mi:ss'), $3)"

module.exports = {
	postWeight: postWeight,
	getWeight: getWeight
}

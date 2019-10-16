// This is a file for the queries used.

// Queries.
const getWeight = "select * from weight order by date desc"
const postWeight = "insert into weight (weight_val_new, date_new, notes) values ($1, $2, $3)"

module.exports = {
	postWeight: postWeight,
	getWeight: getWeight
}

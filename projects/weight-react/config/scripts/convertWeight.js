// Requirements.
const { Client } = require("pg")

// Connection setup.
const connStr = "postgresql://" + process.env.PSQLU + ":" + process.env.PSQLW + "@192.168.1.90:5432/weight"
const client = new Client({ connectionString: connStr })
client.connect()

// Two queries, only used the bottom one.
const getWeight = "select * from weight where id = $1"
const putWeight = "update weight set weight_val_new = $1 where id = $2"

// Array of rows I've deleted in the past.
const arrayOfDeletedIds = [7, 8, 106, 115, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 132, 133]


// Function which takes a rows, gets the date, puts it in to_timestamp and inserts it in the same row.
function putWeightF(val) {
	client.query(getWeight, [val])
		.then(data => {
			let number = data.rows[0].weight_val.split(",")
			client.query(putWeight, [number[0] + "." + number[1], val])
				.then(dataa => console.log(dataa.command))
				.catch(ee => console.log(ee.stack))})
		.catch(e => console.error(e.stack))
}


// A loop the function through the table.
for (let i = 1; i <= 138; i++) {
	if (!arrayOfDeletedIds.includes(i)) putWeightF(i)
}

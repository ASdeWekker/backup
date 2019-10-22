// This file is only meant to be run once at the beginning.
// Because this will set-up the database.

// Require postgres for the database connection.
const { Client } = require("pg")

// The query needed to create the table.
const query = `
create table if not exists weight (
	id serial primary key not null,
	weight_val numeric not null,
	date timestamptz unique not null,
	notes varchar(255))
`

// Connect to the database.
const connStr = "postgres://" + process.env.PSQLU + ":" + process.env.PSQLW + "@192.168.1.90:5432/dekelder"
const client = new Client({ connectionString: connStr })
client.connect()

// Input the query to create the table.
client.query(query).then(data => {
	console.log(data)
	client.end()
}).catch( e=> {
	console.error(e.stack)
	client.end()
})

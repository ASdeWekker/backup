const { Client } = require("pg")
require("dotenv").config({ path: "/var/www/html/backup/projects/weight/.env" })
const query = `
create table if not exists weight (
	id serial primary key not null,
	weight_val int not null,
	date date unique not null,
	notes varchar(255))
`

const connStr = "postgres://" + process.env.PSQLU + ":" + process.env.PSQLW + "@192.168.1.90:5432/dekelder"
const client = new Client({ connectionString: connStr })
client.connect()
client.query(query).then(data => {
	console.log(data)
	client.end()
}).catch( e=> {
	console.error(e.stack)
	client.end()
})

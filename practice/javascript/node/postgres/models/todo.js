const { Client } = require("pg")
require("dotenv").config({ path: "/var/www/html/penp/practice/javascript/node/postgres/1-public/.env" })
const db = "test1"
const query = `
create table if not exists items (
    id smallserial primary key not null,
    text varchar(40) not null,
    complete boolean)
`
const connStr = "postgresql://" + process.env.PSQLU + ":" + process.env.PSQLW + "@192.168.1.90:5432/" + db
const client = new Client({ connectionString: connStr })
client.connect()
client.query(query)
    .then(data => {
        console.log(data)
        client.end()
    }).catch(e => {
        console.error(e.stack)
        client.end()
    })

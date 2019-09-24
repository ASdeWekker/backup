// ===== THIS FILE WILL BE CALLED BY postgres.js =====

// Some deps.
const express = require("express")
const router = express.Router()
require("dotenv").config({ path: "/var/www/html/backup/oefenen/node/postgres/1-public/.env" })
const { Client } = require("pg")

// Connection URI.
const connStr = "postgresql://" + process.env.PSQLU + ":" + process.env.PSQLW + "@192.168.1.90:5432/test1"
// Connect to a new client.
const client = new Client({
	connectionString: connStr,
})
client.connect()
// Query.
const query = "select * from things order by id asc"
const postQuery = "insert into things (name,number,date,date2) values ($1,$2,$3,$4)"

// Get some pages.

// Home page.
router.get("/", (req, res, next) => {
  res.render("index", { title: "PostgreSQL" })
})

// Get the sql page to display some info.
router.get("/sql", (req, res, next) => {
	client.query(query)
		.then(data => res.render("sql", {
			title : "SQL",
			data : data
		}))
		.catch(e => console.error(e.stack))
})

router.post("/sql", (req, res, next) => {
    client.query(postQuery)
        .then(data => res.redirect("/sql")
        ).catch(e => console.log(e.stack))
})

module.exports = router


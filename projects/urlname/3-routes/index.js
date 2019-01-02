const express = require("express")
const { Client } = require("pg")
const router = express.Router()
require("dotenv").config({ path: "/var/www/html/backup/projects/urlname/1-public" })

// ---------- MIDDLEWARE ----------

// Set up the postgres connect url.
const user = process.env.PSQLU
const ww = process.env.PSQLW
const host = "192.168.1.90"
const psqlport = 5432
const db = "dekelder"
const connStr = "postgresql://" + user + ":" + ww + "@" + host + ":" + psqlport + "/" + db

// Create a new client.
const client = new Client({
    connectionString: connStr
})
client.connect()

// Make a query.
const query = "select * from projects"

// ---------- GET PAGES ----------

// A simple getPage function.
function getPage(url, view, title) {
    router.get(url, (req, res, next) => {
        res.render(view, { title : title });
    });
}

// Home page
getPage("/", "index", "Home")

// The second index page.
getPage("/index2", "index2", "Home2")

// Check if the dababase works
router.get("/database", (req, res, next) => {
    client.query(query)
        .then(data => res.render("sql", {
            title : "SQL",
            data : data
        }))
        .catch(e => console.error(e.stack))
})

module.exports = router

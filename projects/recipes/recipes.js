// Code concerning the recipes page.

const express = require("express")
const router = express.Router()
const { Client } = require("pg")
const path = require("path")

// Set up the postgres connect url.
// const user = process.env.PSQLU
// const ww = process.env.PSQLW
// const host = "192.168.1.90"
// const psqlport = 5432
// const db = "dekelder"
// const connStr = "postgresql://" + user + ":" + ww + "@" + host + ":" + psqlport + "/" + db

// Create a new client.
// const client = new Client({
    // connectionString: connStr
// })
// client.connect()

// Queries.
// const query = "select * from recipe_photos"
//const input = "insert into recipe_photo (name) values (" + name + ")"

// --------------- GET  PAGES ---------------

// Function to easily get the page.
function getPage(url, view, title) {
    router.get(url, (req, res, next) => {
        res.render(view, { title: title })
    })
}

//getPage("/", "recipes/recipes", "Recepten.")
router.get("/", (req, res, next) => {
    let url = req.headers.host.split(":")
    res.render("../5-recipes/0-views/recipes", {
        title: "Recepten",
        url: url[0]
    })
})

getPage("/add-recipe", "../5-recipes/0-views/add-recipe", "Voeg recept toe")

getPage("/add-recipe-2", "../5-recipes/0-views/add-recipe-2", "Voeg recept toe 2")

getPage("/add-recipe-3", "../5-recipes/0-views/add-recipe-3", "Voeg recept toe 3")

module.exports = router

const express = require("express")
const path = require("path")
const bodyparser = require("body-parser")

const db = require("mongoskin").db("mongodb://localhost/testdb", { w: 0 })
db.bind("event")

const app = express()

app.use(express.static(path.join(__dirname, "public")))

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

app.listen(3000)

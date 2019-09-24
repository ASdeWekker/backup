// ===== THIS FILE WILL BE CALLED BY postgres.js =====

// TODO
// Be able to upload a photo.
// Make sure you cant get beyond the last link by quering the db and counting the length of records or something.
// Add a timestamp when the item is made & display it.
// Add a timestamp when the item is edited & display it.
// Check why PUT and DELETE aren't working.

// Requirements.
const express = require("express")
const router = express.Router()
const { Pool } = require("pg")
const path = require("path")

// Database connection configuration.
const db = "test1"
const connStr = "postgres://" + process.env.PSQLU + ":" + process.env.PSQLW + "@192.168.1.90:5432/" + db
const pool = new Pool({ connectionString: connStr })
// Database queries.
const getQuery = "select * from items order by id asc"
const postQuery = "insert into items (title, text, complete) values ($1, $2, $3)"
const itemQuery = "select * from items where id = $1"
const putQuery = "update items set title = $1, text = $2 where id = $3"
const deleteQuery = "delete from items where id = $1"

// A function to get a normal page.
function getPage(path, pug, title) {
    router.get(path, (req, res, next) => { res.render(pug, { title: title }) })
}

// ===HOME===  The TODO home page.
getPage("/", "todo/todoindex", "TODO")
// ===ADD===  The TODO add page.
getPage("/add", "todo/addtodo", "Add TODO")

// ===POST===  Posting and inserting a new list item.
router.post("/items", (req, res, next) => {
    const { title, text } = req.body; const complete = false
    pool.query(postQuery, [title, text, complete]).then(data => {
        res.redirect("/todo/todoview")
    }).catch(e => console.error(e.stack))
})

// ===LIST===  The TODO item list view.
router.get("/items", (req, res, next) => {
    pool.query(getQuery).then(data => {
        res.render("todo/todoview", { data: data, title: "TODO view" })
    }).catch(e => console.error(e.stack))
})

// ===ITEM===  Get a single item.
router.get("/items/:id", (req, res, next) => {
    const id = parseInt(req.params.id)
    pool.query(itemQuery, [id]).then(data => {
        pool.query(getQuery).then(items => {
            res.render("todo/itemview", { data: data, items: items, title: data.rows[0].title })
        }).catch(err => console.error(err.stack))
    }).catch(e => console.error(e.stack))
})

// ===JSON===  Get a single item in JSON form.
router.get("/items/json/:id", (req, res, next) => {
    const id = parseInt(req.params.id)
    pool.query(itemQuery, [id]).then(data => {
        return res.json(data.rows[0])
    })
})

// ===EDIT===  Get the page to edit a single item.
router.get("/items/edit/:id", (req, res, next) => {
    const id = parseInt(req.params.id)
    pool.query(itemQuery, [id]).then(data => {
        res.render("todo/edititem", { data: data, title: data.rows[0].title })
    }).catch(e => console.error(e.stack))
})

// ===PUT===  Save the changes made to the database.
router.put("/items/:id", (req, res, next) => {
    const { id, title, text } = req.params
    pool.query(putQuery, [title, text, id]).then(put => {
        pool.query(itemQuery, [data.id]).then(data => {
            pool.query(getQuery).then(items => {
                res.render("todo/itemview", { data: data, items: items, title: data.rows[0].title })
            })
        })
    })
})

// ===DELETE=== Delete an item.
router.delete("/items/:id", (req, res, next) => {
    const id = parseInt(req.params.id)
    pool.query(deleteQuery, [id]).then(delet => {
        pool.query(getQuery).then(data => {
            res.render("todo/todoview", { data: data, title: "TODO view" })
        }).catch(err => console.error(err.stack))
    }).catch(e => console.error(e.stack))
})

module.exports = router



//api/puppies            GET all
//api/puppies/:id        GET single
//api/puppies            POST
//api/puppies/:id        PUT
//api/puppies/:id        DELETE

//todo/                  GET home
//todo/add               GET add
//todo/items             GET all
//todo/items/:id         GET single
//todo/items             POST
//todo/items/json/:id    GET JSON
//todo/items/edit/:id    GET edit
//todo/items/:id         PUT
//todo/items/:id         DELETE


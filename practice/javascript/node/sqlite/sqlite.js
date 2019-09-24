const express = require("express");
const sqlite = require("sqlite3");
const path = require("path");

const app = express();
const port = 3000;

app.disable("x-powered-by");

app.set("views", path.join(__dirname, "0-views"));
app.set("view engine", "pug");
app.locals.pretty = true;

app.use(express.static(path.join(__dirname, "1-public")));

function getPage(url, view, title) {
    app.get(url, (req, res) => {
        res.render(view, { title: title });
    });
}

getPage("/", "index", "Home");


app.listen(port, () => {
    console.log("SQLite is now listening on port: " + port);
}); 


// var sqlite3 = require("sqlite3");
// var db = new sqlite3.Database(":memory:");

// db.serialize(() => {
//     db.run("CREATE TABLE lorem (info TEXT)");

//     var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//     for (var i = 0; i < 10; i++) {
//         stmt.run("Ipsum " + i);
//     }
//     stmt.finalize();

//     db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
//         console.log(row.id + ": " + row.info);
//     });
// });
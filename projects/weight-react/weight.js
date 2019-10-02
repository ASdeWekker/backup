const express = require("express")
const bodyParser = require("body-parser")

const indexRouter = require("./routes/index.js")

const app = express()

app.disable("x-powered-by")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// app.get("/api/weight", (req, res) => {
//     const weight = [
//         {id: 1, weight: "100", date: "21-09-2019"},
//         {id: 2, weight: "105", date: "11-08-2019"},
//         {id: 3, weight: "110", date: "03-07-2019"}
//     ]

//     res.json(weight);
// })


app.use("/api", indexRouter)


module.exports = app

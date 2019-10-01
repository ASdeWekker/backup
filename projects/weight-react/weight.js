const express = require("express")

const app = express()


app.get("/api/weight", (req, res) => {
    const weight = [
        {id: 1, weight: "100", date: "21-09-2019"},
        {id: 2, weight: "105", date: "11-08-2019"},
        {id: 3, weight: "110", date: "03-07-2019"}
    ]

    res.json(weight);
})


module.exports = app

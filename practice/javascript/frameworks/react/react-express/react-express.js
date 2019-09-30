const express = require("express")

const app = express()
const port = 3001

app.get("/api/customers", (req, res) => {
    const customers = [
        {id: 1, firstName: "Alex", lastName: "de Wekker"},
        {id: 2, firstName: "John", lastName: "Doe"},
        {id: 3, firstName: "Mary", lastName: "Swanson"}
    ]

    res.json(customers);
})

app.listen(port, () => console.log("App is listening on port " + port));


// Deps.
const express = require("express")
const router = express.Router()

// A route
router.get("/on", (req, res) => {
	res.send("This turns the pc on")
})

module.exports = router
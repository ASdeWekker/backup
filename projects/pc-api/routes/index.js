// Deps.
const express = require("express")
const { exec } = require("child_process")
const router = express.Router()

// A route
router.get("/on", (req, res) => {
	exec("wol 30:9c:23:04:60:2f", (err, stdout, stderr) => {
		if (err) {
			console.error(`exec error: ${err}`)
			return
		}
		if (stderr) {
			console.error(`stderr: ${stderr}`)
			res.json({ "message": "There was an error, check the log" })
		}
		if (stdout) {
			console.log(`stdout: ${stdout}`)
			res.json({ "message": "The pc has been powered on" })
		}
	})
})

router.get("/off", (req, res) => {
	res.send("This turns the pc off")
})

module.exports = router
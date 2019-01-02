// ----------------------- TO DO ------------------------
//
// DONE == Debug photo styling issue chrome mobile.
// Add some test info from the db.
// html height is bigger, set no scroll and change body height.
//
// Get two extra divs, div1 > div2 > .container div2 is bigger than div1
// Maybe div2 and container are equals and div2 spans the entire page
// plus 60 pixels for the chrome bar.
// div2 is 60 pixels longer than div1 and div1 is overflow hidden.


const express = require("express")
const favicon = require("serve-favicon")
const mongodb = require("mongodb")
const path = require("path")
const router = express.Router()

// -------------------- GET PAGES -----------------------

// A simple getPage function.
function getPage(url, view, text) {
    router.get(url, (req, res) => {
        res.render(view, { text : text })
    });
}

// The homepage.
getPage("/", "index", "Welcome to SpeedTest.")

// The temporary results page.
getPage("/results", "results", "Here are some results.")

module.exports = router

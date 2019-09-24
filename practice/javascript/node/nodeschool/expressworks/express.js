var express = require("express");
var path = require("path");
var app = express();

app.set('view engine', 'jade');

/*app.get("/home", function(req, res) {
	res.send("Hello World!");
});*/

app.get("/home", function(req, res) {
	res.render(process.argv[3], { date: new Date().toDateString() });
});

//app.use(express.static(process.argv[3] || path.join(__dirname, 'public')));

app.listen(process.argv[2]);

var express = require("express");
var path = require("path");
var app = express();
var port = 3001;
var db = "expresstut";

app.disable("x-powered-by"); // Zorg ervoor dat er niks over de server in de header wordt gezet

var handlebars = require("express-handlebars").create({defaultLayout:"main"});

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

// More imports here
app.use(require("body-parser").urlencoded({extended: true}));

var formidable = require("formidable");

var credentials = require("./credentials.js");
app.use(require("cookie-parser")(credentials.cookieSecret));

app.use(express.static(__dirname + "/public"));

var favicon = require("serve-favicon");

app.use(favicon(__dirname + "/public/img/favicon.ico"));
app.use(favicon(path.join(__dirname, "public","img","favicon.ico")));

function routes(path, name){
    app.get(path, function(req, res){
        res.render(name);
    });
}

routes("/", "home");

// Middleware function
app.use(function(req, res, next){
    console.log("Looking for URL : " + req.url);
    next();
});

app.get("/junk", function(req, res, next){
    console.log("Tried to acces /junk");
    throw new Error("/junk doesn\'t exist");
});

app.use(function(err, req, res, next){
    console.log("Error : " + err.message);
    next();
});

routes("/about", "about");

app.get("/contact", function(req, res){
    res.render("contact", { csrf: "CSRF token here"});
});

routes("/thankyou", "thankyou");

app.post("/process", function(req, res){
    console.log("Form : " + req.query.form);
    console.log("CSRF token : " + req.body._csrf);
    console.log("Email : " + req.body.email);
    console.log("Question : " + req.body.ques);
    res.redirect(303, "/thankyou");
});

app.get("/file-upload", function(req, res){
    var now = new Date();
    res.render("file-upload", {
        year: now.getFullYear(),
        month: now.getMonth()
    });
});

app.post("/file-upload/:year/:month", function(req, res){
   var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, file){
        if(err)
            return res.redirect(303, "/error");
        console.log("received file");
        console.log(file);
        res.redirect(303, "/thankyou", {
            file: file
        });
    });
});

app.get("/cookie", function(req, res){
    res.cookie("username", "Alex de Wekker", {expire: new Date() + 9999}).send("username has the value of Alex de Wekker");
});

app.get("/listcookies", function(req, res){
    console.log("Cookies : ", req.cookies);
    res.send("Look in the console for cookies");
});

app.get("/deletecookie", function(req, res){
    res.clearCookie("username");
    res.send("username Cookie deleted");
});

var session = require("express-session");

var parseurl = require("parseurl");

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: credentials.cookieSecret
}));

app.use(function(req, res, next){
    var views = req.session.views;
    if(!views){
        views = req.session.views = {};
    }

    var pathname = parseurl(req).pathname;

    views[pathname] = (views[pathname] || 0) + 1;
    next();
});

app.get("/viewcount", function(req, res, next){
    res.send("You viewed this page " + req.session.views["/viewcount"] + " times");
});

var fs = require("fs");

app.get("/readfile", function(req, res, next){
    fs.readFile("./public/randomfile.txt", function(err, data){
        if(err){
            return console.error(err);
        }
        res.send("The file : " + data.toString());
    });
});

app.get("/writefile", function(req, res, next){
    fs.writeFile("./public/randomfile2.txt", "More random text", function(err){
        if(err){
            return console.error(err);
        }
    });
    fs.readFile("./public/randomfile2.txt", function(err, data){
        if(err){
            console.error(err);
        }
        res.send("Randomfile2 : " + data.toString());
    });
});

app.use(function(req, res){
    res.type("text/html");
    res.status(404);
    res.render("404");
});

app.use(function(err, req, res, next){
    console.log(err.stack);
    res.status(500);
    res.render("500");
});

app.listen(port, () => {
    console.log("    " + db.toUpperCase() + " is now listening on port: " + port);
});
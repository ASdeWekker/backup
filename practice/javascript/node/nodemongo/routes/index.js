var express = require('express');
var router = express.Router();
var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;
var user = process.env.MONGODB_RWU;
var ww = process.env.MONGODB_RWP;
var ip = "192.168.1.90";
var mongoport = 27017;
var url = "mongodb://" + user + ":" + ww + "@" + ip + ":" + mongoport + "/nodemongo";

/* Simple page GET function */
function getPage(path, page, title){
    router.get(path, function(req, res, next){
        res.render(page, { title: title });
    });
}
getPage("/", "index", "NodeMongo");

router.get("/thelist", function(req, res){
    MongoClient.connect(url, function(err, db){
        if(err){
            console.log("Unable to connect to the server", err);
        } else {
            console.log("Connection established");
            var collection = db.collection("students");
            collection.find({}).toArray(function(err, result){
                if(err){
                    res.send(err);
                } else if(result.length){
                    res.render("studentlist", {
                        "studentlist" : result
                    });
                } else {
                    res.send("No documents found");
                }
                db.close();
            });
        }
    });
});

getPage("/newstudent", "newstudent", "Add student");

router.post("/addstudent", function(req, res){
    MongoClient.connect(url, function(err, db){
        if(err){
            console.log("Unable to connect to server", err);
        } else {
            console.log("Connected to server");
            var collection = db.collection("students");
            var student1 = {
                student: req.body.student,
                street: req.body.street,
                city: req.body.city,
                state: req.body.state,
                sex: req.body.sex,
                gpa: req.body.gpa
            };
            collection.insert([student1], function(err, result){
                if(err){
                    console.log(err);
                    res.render("index", {
                        title: "Home",
                        error: err
                    });
                } else {
                    res.redirect("thelist");
                }
                db.close();
            })
        }
    });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;
var user = process.env.MONGODB_RWU;
var ww = process.env.MONGODB_RWP;
var ip = "192.168.1.90";
var mongoport = "27017";
var db = "meantut";
var cols = "students";
var url = "mongodb://" + user + ":" + ww + "@" + ip + ":" + mongoport + "/" + db;

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get("/thelist", function(req, res){
    MongoClient.connect(url, function(err, db){
        if(err){
            console.log("Unable to connect to server", err);
        } else {
            console.log("Connection established to", url);
            var collection = db.collection(cols);
            collection.find({}).toArray(function(err, result) {
                if(err){
                    res.send(err);
                } else if(result.length) {
                    res.render("studentlist", {
                        "studentlist":result
                    });
                } else {
                    res.send("No documents found");
                }
                db.close();
            });
        }
    });
});

module.exports = router;

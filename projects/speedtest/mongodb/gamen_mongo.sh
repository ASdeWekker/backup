#!/bin/bash

mongo 192.168.1.90:27017/speedtest -u $MONGODB_RWU -p $MONGODB_RWP --eval "db.testresults.insert({date:new Date(),resu:{ping:["13","435"],down:["88","55"],uplo:["29","45"]}})"

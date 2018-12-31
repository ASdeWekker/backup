#!/bin/bash

results=( $( speedtest-cli --simple | grep -o '[0-9]*' ) )
mongo 192.168.1.90:27017/speedtest -u $MONGODB_RWU -p $MONGODB_RWP --eval "db.testresults.insert({date:new Date(),resu:{ping:["${results[0]}","${results[1]}"],down:["${results[2]}","${results[3]}"],uplo:["${results[4]}","${results[5]}"]}})"

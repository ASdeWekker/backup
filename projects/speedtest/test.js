#!/bin/node
const { Client, Pool } = require("pg")
const { exec } = require("child_process")
require("dotenv").config({ path: "/var/www/html/backup/projects/speedtest/1-public/.env" })
const pool = new Pool({ connectionString: connStr = "postgresql://" + process.env.PSQLU + ":" + process.env.PSQLW + "@192.168.1.90:5432/speedtest" })
exec("speedtest-cli --simple | grep -o '[0-9]*'", (err, stdout, stderr) => {
    if (err) console.error(error)
    if (stderr) console.log(stderr)
    var output = stdout.split("\n")
    const query = "insert into hourly_tests (date, ping, down, uplo) values (now(), '{\"" + output[0] + "\",\"" + output[1] + "\"}', '{\"" + output[2] + "\",\"" + output[3] + "\"}', '{\"" + output[4] + "\",\"" + output[5] + "\"}')"
    pool.query(query, (err, res) => {
        if (err) console.log(err)
        console.log(res)
        pool.end()
    })
})

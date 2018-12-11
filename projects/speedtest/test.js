#!/bin/node

const { Client, Pool } = require("pg")
const { execFile } = require("child_process")

const user = process.env.PSQLU
const ww = process.env.PSQLW
const host = "localhost"
const psqlport = 5432
const db = "test1"
const connStr = "postgresql://" + user + ":" + ww + "@" + host + ":" + psqlport + "/" + db

const pool = new Pool({
    connectionString: connStr
})
// const pool = new Pool({
//     user: user,
//     host: host,
//     database: db,
//     password: ww,
//     port: psqlport,
// })
//client.connect()

const query = "select * from things"

pool.query(query, (err, res) => {
    if (err) {
        console.log(err)
    }
    // console.log(res.rows[0].id)
    for (let i = 0;i < 3;i++) {
        console.log(res.rows[i].id)
        console.log(res.rows[i].name)
        console.log(res.rows[i].number)
    }
    pool.end()
})

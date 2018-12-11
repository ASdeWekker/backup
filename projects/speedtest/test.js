#!/bin/node

const { Client } = require("pg");
const { execFile } = require("child_process");

const user = process.env.PSQLU;
const ww = process.env.PSQLW;
const host = "localhost";
const psqlport = 5432;
const db = "test1";
const connStr = "postgresql://" + user + ":" + ww + "@" + host + ":" + psqlport + "/" + db;

const client = new Client({
    connectionString: connStr
});
client.connect();

const query = "select * from things;";

client.query(query)
    .then(data => console.log(data.rows))
    .catch(e => console.error(e.stack));

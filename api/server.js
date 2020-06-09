const express = require("express");

const AccountsRouter = require ("../accounts/accounts-router.js");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

//server.use("/api/accounts")

server.get("/", function(req, res){
    res.status(200).json({ api: "up" });
})


module.exports = server;


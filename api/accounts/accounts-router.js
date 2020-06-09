const express = require("express");

//database access using knex
const knex = require('../data/dbConfig.js');

const router = express.Router();

reouter.get('/', function(req, res){
    res.send("My App is ok");
})
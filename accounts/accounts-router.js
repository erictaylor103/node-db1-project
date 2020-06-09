const express = require("express");

//database access using knex
const db = require('../data/dbConfig.js');

const router = express.Router();

module.exports = router;

//GET all from accounts
router.get('/', function(req, res){
    db.select("*").from("accounts")
    .then(accounts =>{
        res.status(200).json({data: accounts})
    })
    .catch(error => {
        res.status(500).json({ message: error.message} );
    })
})


//GET query by id
router.get('/:id', function(req, res){
    const id = req.params.id;

    db.select("*").from("accounts").where({id}).first()
    .then(account =>{
        if(account){
            res.status(200).json({ data: account});
        }else{
            res.status(404).json({ message: "Account Id not found"});
        }
    })
    .catch(error =>{
        console.log(error);

        res.status(500).json({ message: "Account ID does not exist"});
        
    })
})

//POST query
router.post('/', function(req, res){
    const id = req.params.id;
    postData = req.body;
    db("accounts").insert(postData, {id})
    .then(([id]) =>{
        res.status(201).json({ data: id});
    })
    .catch(error =>{
        console.log(error);
        res.status(500).json({ message: error.message});
    })
})

//PUT query

router.put("/:id", function(req, res){
    const id = req.params.id;
    const changes = req.body;

    db("accounts")
        .where({ id })
        .update(changes)
        .then(count =>{
            if(count > 0){
                res.status(200).json({ message: "record updated successfully"});
            }else{
                res.status(404).json({ message: "record not found"});
            }
        })
        .catch(error =>{
            console.log(error);
            res.status(500).json({ message: error.message });
        })
        
})


//DELETE query

router.delete("/:id", function(req, res){
    const id = req.params.id;

    db("accounts")
    .where({ id })
    .del()
    .then(count =>{
        if(count > 0){
            res.status(200).json({ message: "record deleted successfully"});
        }else{
            res.status(404).json({ message: "record not found" });
        }
    })
    .catch(error =>{
        console.log(error);
        res.status(500).json({ message: error.message });
    })
})


module.exports = router;
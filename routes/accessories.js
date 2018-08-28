"use strict";

// the following line says that we're going to use a file called express in this file. It doesn't come from the express-demo folder but from something we installed with express.
const express = require("express");
// express.Router() is a built-in function with express. It is not in this current folder.
const accessories = express.Router();
// our hard-coded list of accessories, written in JSON format
const accessoryList = [
    {
        "brand": "Gucci", 
        "type": "watch",
        "material": ["tungsten", "silver", "radium"],
        "price": 200,
        "id": 0
    },
    {
        "brand": "Shinola", 
        "type": "watch",
        "material": ["gold-plating", "aluminum", "tin"],
        "price": 500,
        "id": 1        
    },
    {
        "brand": "Invicta", 
        "type": "Watch",
        "material": ["Gold", "Silver", "Obsidian", "Wood"],
        "price": 300,
        id: 2
    }        
];

// the accessoryList length is 3. we hard-coded ids from 0 to 2. We'll let idCount begin from where we left off
let idCount = accessoryList.length;


accessories.get("/accessories", function (req, res) {
    res.send(accessoryList)    
})

accessories.delete("/accessories/:id", function(req, res){
    let count = 0;
    for (let accessory of accessoryList) {
        if (accessory.id == req.params.id) {
            accessoryList.splice(count, 1);
        }
        count++;        
    }
    res.send(accessoryList);                            
});

accessories.post("/accessories", (req, res) => {
    accessoryList.push({
        brand: req.body.brand,
        type: req.body.type,
        material: req.body.material,
        price: req.body.price,
        id: idCount++                                                                                                                                                        
    });
    res.send(accessoryList);                
});

accessories.put("/accessories/:id", function(req, res){
    let count = 0;
    console.log("Called put route");
    console.log(req.body);
    for (let accessory of accessoryList) {
        if (accessory.id == req.params.id) {
            let updatedAccessory = {
                brand: req.body.brand,
                type: req.body.type,
                material: req.body.material,
                price: req.body.price
            }
            updatedAccessory.id = accessory.id;
            accessoryList.splice(count, 1, updatedAccessory);
        }
        count++;        
    }
    res.send(accessoryList);                            
});

// "in order to expose a variable or function from a Node module, you must add it to
// the module.exports object." So, we're going to be exporting the accessories object, which seems to be this entire page.
module.exports = accessories;
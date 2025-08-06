// const express = require("express"); //commonjs

//npm run start

import express from "express";

const app = express();//so we created an app which came from express

const port = 3000;

// app.get("/",(req,res)=>{
//     res.send("hello i am dattatreya from index.js");//it is like if req.url === "/" then send the following respond
// })

// app.get("/ice-tea",(req,res)=>{
//     res.send("thanks for choosing ice-tea");//it is like if req.url === "/ice-tea" then send the following respond
// })

// app.get("/black-tea",(req,res)=>{
//     res.send("thanks for choosing black-tea");//it is like if req.url === "/black-tea" then send the following respond
// })

app.use(express.json());

let teaData = [];
let nextId = 1;

//FOR ADDING NEW OBJECTS
app.post("/teas",(req,res)=>{
    //req.body is an object and inside the object there are many properties like name,price etc so req.body.name like this
    const {name,price} = req.body;//here we are extracting the name and price from the req.body object..these name,price will be given by users only
    const newTeas = { //we are creating an object which consists of the tea name,tea price, and unique id for each tea
        id:nextId++,
        name : name,
        price :price
    }
    teaData.push(newTeas);//we are pushing the object in the array
    res.status(201).send(newTeas);
})

//GET ALL TEAS
app.get("/teas",(req,res)=>{
    res.status(200);
    res.send(teaData);
    // res.status(200).send(teaData);
})

//GET PARTICULAR TEA
app.get("/teas/:id",(req,res)=>{
    const tea = teaData.find(t => t.id === parseInt(req.params.id));
    //so params is used when we want to extract something from the url..in the url we will mention the id and that id we will find using find()
    //so if we want something from the body then use req.body if we want something from url then use req.params
    if(!tea){
        return res.status(404).send("tea not found");
    }else{
        res.status(200).send(tea);
    }
})

//UPDATE TEA
app.put("/teas/:id",(req,res)=>{
    const tea = teaData.find(t => t.id === parseInt(req.params.id));
    if(!tea){
        return res.status(404).send("tea not found");
    }else{
        const {name,price} = req.body;
        tea.name = name;
        tea.price = price;
        res.status(200).send(tea);
    }
})

//DELETE TEA..THIS ALSO WORKS
// app.delete("/teas/:id",(req,res)=>{
//     const teaId = parseInt(req.params.id);
//     teaData = teaData.filter(t => t.id!= teaId);
//     res.status(200).send("deleted");
// })

// DELETE TEA
app.delete("/teas/:id",(req,res)=>{
    const teaId = parseInt(req.params.id);
    const index = teaData.findIndex(t => t.id!= teaId);
    if(index === -1){
        return res.status(404).send("tea not found so cant be deleted");
    }else{
        teaData.splice(index,1);
        return res.status(200).send("deleted");
    }
})



app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})


// Basic Rout, Rout Parameter

const express = require('express');

const app = express();
const port = 3000;

app.get('/',(req,res)=>{
    res.send('Hi There!');
});

app.get('/bye',(req,res)=>{
    console.log("A request sent to /bye");
    res.send("Goodbye!");
});

app.get('/dog',(req,res)=>{
    console.log("A request sent to /dog");
    res.send('MEOW!');
});

app.get('/r/:RoutParameter',(req,res)=>{
    console.log(req.params);
    let subURL = req.params.RoutParameter;
    res.send(`Welcome to the ${subURL}`);
});

app.get('/r/:RoutParameter/comments/:id/:title',(req,res)=>{
    console.log(req.params);
    let title = req.params.title;
    res.send(`Welcome to the ${title}`);
});

app.get('*',(req,res)=>{
    res.send('Error 404!');
});

app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`);
})
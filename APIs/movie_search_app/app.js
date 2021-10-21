const express = require('express');
const app = express();
const port = 3005;

const request = require('request');

app.use(express.static('public'));
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('home');
});

app.get('/results',(req,res)=>{
    let query = req.query.search;
    let url = `https://www.omdbapi.com/?apikey=38c07fb2&s=${query}`;
    request(url,(error,response,body)=>{
        if(!error && response.statusCode == 200){
            let data = JSON.parse(body);
            res.render('results',{data:data});
        }
    })
});


app.get('*',(req,res)=>{
    res.send('Page Error,404!!');
});

app.listen(port,()=>{
    console.log('Movie API server has started');
});
const express = require('express');
const app = express();
const port = 3002;

app.use(express.static('public'));
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('home');
    // res.render('home.ejs');
    // res.send('<h1>Welcome to the home page!<h1><h2>blah blah<h2>');
});

app.get('/fallinlovewith/:thing',(req,res)=>{
    let thing = req.params.thing;
    // res.render('love.ejs',{ThingVariable:'Rusty'});
    // res.render('love.ejs',{ThingVariable:thing});
    res.render('love',{ThingVariable:thing});
});

app.get('/posts',(req,res)=>{
    let posts = [
        {title: 'Post 1',author: 'Tahmid Hasan',},
        {title: 'Greatest Footballer in the history',author: 'Mredul Jaman'},
        {title: 'Significance Of Islam in Life',author:'Abdullah'}
    ];
    // res.render('posts.ejs',{posts:posts});
    res.render('posts',{posts:posts});
});

app.get('*',(req,res)=>{
    res.send('Page Error,404!!');
});

app.listen(port,()=>{
    console.log('Server is listening!!!');
});
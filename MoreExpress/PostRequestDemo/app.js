const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
const port = 3003;

app.set('view engine','ejs');
app.use(express.static('public'));

let friends = ['Rahi','Gazi','Faisal','Mredul Jaman','Naeem Ahmed','Redwan Ahmed'];

app.get('/',(req,res)=>{
    res.render('home');
});

app.post('/addfriend',(req,res)=>{
    let newFriend = req.body.NewFriend;
    friends.push(newFriend);
    res.redirect('/friends');
});

app.get('/friends',(req,res)=>{   
    res.render('friends',{friends:friends});
});

app.get('*',(req,res)=>{
    res.send('Page Error,404 Code !!!');
});

app.listen(port,()=>{
    console.log('Server Started Successfully');
});
const express = require('express');
const app = express();
const port = 3006;

const bodyParser = require('body-parser');

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

let campgrounds =[
    {name:'Salmon Greek',image:'https://images.unsplash.com/photo-1576176539998-0237d1ac6a85?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2FtcGluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60'},
    {name:'Granite Hill',image:'https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGNhbXBpbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60'},
    {name:"Mountain Goat's Rest",image:'https://images.unsplash.com/photo-1516939884455-1445c8652f83?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNhbXBpbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60'},
    {name:'Salmon Greek',image:'https://images.unsplash.com/photo-1576176539998-0237d1ac6a85?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2FtcGluZ3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60'},
    {name:'Granite Hill',image:'https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGNhbXBpbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60'},
    {name:"Mountain Goat's Rest",image:'https://images.unsplash.com/photo-1516939884455-1445c8652f83?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGNhbXBpbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=60'}
];

app.get('/',(req,res)=>{
    res.render('landing');
});

app.get('/campgrounds',(req,res)=>{   
    res.render('campground',{campgrounds:campgrounds});
});

app.post('/campgrounds',(req,res)=>{
    //Collect Data From The form and add to the campground array
    let name = req.body.name;
    let image = req.body.image;
    let newCampground = {name:name ,image:image};
    campgrounds.push(newCampground);
    //Redirect to the campgrounds route
    res.redirect('/campgrounds');
});

app.get('/campgrounds/new',(req,res)=>{
    res.render('new');
});

app.get('*',(req,res)=>{
    res.send('Sorry!!Page Error!!Try Another Page');
});

app.listen(port,()=>{
    console.log('The YelpCamp Server Has Started!!');
});
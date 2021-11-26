const express  = require('express'),
      app      = express(),
      port     = 3000,
      bodyParser = require('body-parser'),
      mongoose = require('mongoose'),
      Campground = require('./models/campground'),
      seedDB     = require('./seeds');

//Initiate seed file
seedDB();
// mongoose.connect('mongodb://localhost/yelp_camp'); //Old Version
mongoose.connect('mongodb://localhost:27017/yelp_camp_v3',{useNewUrlParser:true});

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));


app.get('/',(req,res)=>{
    res.render('landing');
});

//INDEX Route - Show All Campgrounds
app.get('/campgrounds',(req,res)=>{   
    //Get All Campgrounds From Database
    Campground.find({},(err,allcampgrounds) => {
        if(err){
            console.log(err);
        }else{
            res.render('index',{campgrounds:allcampgrounds});
        }
    });
});

//CREATE Route - Add New Campground to Database
app.post('/campgrounds',(req,res)=>{
    //Collect Data From The form and add to the campground array
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;
    let newCampground = {
        name:name,
        image:image, 
        description:desc
    };
    //Create A new Campground and save it to DB
    Campground.create(newCampground,(err,newlyCreated) => {
        if(err){
            console.log(err);
        }
        else{
            //Redirect to the campgrounds route
            res.redirect('/campgrounds');
        }
    })    
});

//NEW Route - Show Form To Create New Campground
app.get('/campgrounds/new',(req,res)=>{
    res.render('new');
});

//SHOW Route - Shows More Info About One Campground
app.get('/campgrounds/:id',(req,res)=>{
    //find the campground with provided ID
    Campground.findById(req.params.id).populate('comments').exec((err,foundCampground)=>{
        if(err){
            console.log(err);
        }else{
            // console.log(foundCampground);
            //render show template with that campground
            res.render('show',{campground:foundCampground});
        }
    });    
});

app.get('*',(req,res)=>{
    res.send('Sorry!!Page Error!!Try Another Page');
});

app.listen(port,()=>{
    console.log('The YelpCamp Server Has Started!!');
});
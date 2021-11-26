const express    = require('express'),
      router     = express.Router(),
      Campground = require('../models/campground');

//INDEX Route - Show All Campgrounds
router.get('/',(req,res)=>{  //Route = '/campgrounds'
    // console.log(req.user);  //Contain all information about user
    //Get All Campgrounds From Database
    Campground.find({},(err,allcampgrounds) => {
        if(err){
            console.log(err);
        }else{
            res.render('campgrounds/index',{campgrounds:allcampgrounds });
        }
    });
});

//CREATE Route - Add New Campground to Database
router.post('/',isLoggedIn,(req,res)=>{ //Route = '/campgrounds'
    //Collect Data From The form and add to the campground array
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;
    let author = {
        id : req.user._id,
        username : req.user.username
    }

    let newCampground = {
        name:name,
        image:image, 
        description:desc,
        author:author
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
router.get('/new',isLoggedIn,(req,res)=>{ //Route = '/campgrounds/new'
    res.render('campgrounds/new',{currentUser:req.user}); 
});

//SHOW Route - Shows More Info About One Campground
router.get('/:id',(req,res)=>{ //Route = '/campgrounds/:id'
    //find the campground with provided ID
    Campground.findById(req.params.id).populate('comments').exec((err,foundCampground)=>{
        if(err){
            console.log(err);
        }else{
            // console.log(foundCampground);
            //render show template with that campground
            res.render('campgrounds/show',{campground:foundCampground});
        }
    });    
});

//middleware function
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}


module.exports = router;

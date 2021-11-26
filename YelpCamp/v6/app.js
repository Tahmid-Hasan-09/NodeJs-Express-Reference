const express      = require('express'),
      app            = express(),
      port           = 3000,
      bodyParser     = require('body-parser'),
      mongoose       = require('mongoose'),
      Campground     = require('./models/campground'),
      Comment        = require('./models/comment'),
      User           = require('./models/user.js'),
      seedDB         = require('./seeds'),      
      passport       = require('passport'),
      LocalStrategy  = require('passport-local'),
      expressSession = require('express-session');
      

//Initiate seed file
seedDB();
// mongoose.connect('mongodb://localhost/yelp_camp'); //Old Version
mongoose.connect('mongodb://localhost:27017/yelp_camp_v6',{useNewUrlParser:true});

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(`${__dirname}/public`));



//PASSPORT CONFIGURATION
app.use(expressSession({
    secret : 'Once Again Rusty wins Cutest Dog!!',
    resave : false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Pass req.user to all ejs files 
app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    next();
});

app.get('/',(req,res)=>{
    res.render('landing');
});

//INDEX Route - Show All Campgrounds
app.get('/campgrounds',(req,res)=>{ 
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
    res.render('campgrounds/new',{currentUser:req.user});
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
            res.render('campgrounds/show',{campground:foundCampground});
        }
    });    
});

//=======================
//Comment Routes
//========================
app.get('/campgrounds/:id/comments/new',isLoggedIn,(req,res)=>{
    //find campground by Id
    Campground.findById(req.params.id,(err,foundCampground)=>{
        if(err){
            console.log(err);
        }else{
            res.render('comments/new',{campground:foundCampground});
        }
    });    
});

app.post('/campgrounds/:id/comments',isLoggedIn,(req,res)=>{
    //lookup campground using id
    Campground.findById(req.params.id,(err,campground)=>{
        if(err){
            console.log(err);
            res.redirect('/campgrounds');
        }else{
            //create new comment
            Comment.create(req.body.comment,(err,comment)=>{
                if(err){
                    console.log(err);
                }else{
                    //connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    //redirect to campground show page
                    res.redirect(`/campgrounds/${campground._id}`);
                }
            })
        }
    });
});

//============
//Auth ROUTES
//============
//Show Register Form
app.get('/register',(req,res)=>{
    res.render('register');
});

//handle Sign Up Logic
app.post('/register',(req,res)=>{
    let newUser = new User({username : req.body.username});
    User.register(newUser,req.body.password,(err,user)=>{
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req,res,()=>{
            res.redirect('/campgrounds');
        });
    });
});

//show login form
app.get('/login',(req,res)=>{
    res.render('login');
});

//handle login logic
// app.post('/login',middleware,callback);
app.post('/login',passport.authenticate('local',{
    successRedirect : '/campgrounds',
    failureRedirect : '/login'
}),(req,res)=>{});

//logout Route
app.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/campgrounds');
});

//middleware function
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

app.get('*',(req,res)=>{
    res.render('new');
});

app.listen(port,()=>{
    console.log('The YelpCamp Server Has Started!!');
});
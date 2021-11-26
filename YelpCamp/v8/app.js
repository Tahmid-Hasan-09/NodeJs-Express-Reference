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

//requiring routes
const indexRoutes      = require('./routes/index'),
      campgroundRoutes = require('./routes/campgrounds'),
      commentRoutes    = require('./routes/comments');
      

//Initiate seed file
//seedDB(); //Seed the databae
// mongoose.connect('mongodb://localhost/yelp_camp'); //Old Version
mongoose.connect('mongodb://localhost:27017/yelp_camp_v8',{useNewUrlParser:true});

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

// app.use(indexRoutes);
// app.use(campgroundRoutes);
// app.use(commentRoutes);

//Route URL Shortening
app.use('/',indexRoutes);
app.use('/campgrounds',campgroundRoutes);
app.use('/campgrounds/:id/comments',commentRoutes);


app.listen(port,()=>{
    console.log('The YelpCamp Server Has Started!!');
});
const express             = require("express"),
    mongoose              = require("mongoose"),
    PORT                  = 3000,
    passport              = require("passport"),
    bodyParser            = require("body-parser"),
    User                  = require("./models/user"),
    LocalStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    expressSession        = require('express-session');
    
mongoose.connect("mongodb://localhost:27017/auth_demo_app",{useNewUrlParser:true});
let app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//============
// ROUTES
//============

app.get("/", (req, res)=>{
    res.render("home");
});

app.get("/secret",isLoggedIn,(req, res)=>{
   res.render("secret"); 
});

// Auth Routes

//show sign up form
app.get("/register", (req, res)=>{
   res.render("register"); 
});
//handling user sign up
app.post("/register", (req, res)=>{
    //req.body.username
    //req.body.password
    User.register(new User({username : req.body.username}),req.body.password,(err,user)=>{
        if(err){
            console.log(err);
            return res.render('register');
        }else{
            passport.authenticate('local');
            res.redirect('/secret');
            // passport.authenticate('local')(req,res,()=>{
            //     res.redirect('/secret');
            // });
        }
    });
});

//Login ROUTES
//Render Login Form
app.get('/login',(req,res)=>{
    res.render('login');
});
//Login Logic
//middleware
app.post('/login',passport.authenticate('local',{
    successRedirect : '/secret',
    failureRedirect : '/login'
}),(req,res)=>{
});

app.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
});

//After Login middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

app.listen(PORT, ()=>{
    console.log("server started.......");
})
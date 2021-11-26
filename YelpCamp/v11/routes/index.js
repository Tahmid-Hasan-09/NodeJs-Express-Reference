const express  = require('express'),
      router   = express.Router(),
      passport = require('passport'),
      User     = require('../models/user');

//Root Route
router.get('/',(req,res)=>{
    res.render('landing');
});

//======================
//     Auth ROUTES
//======================
//Show Register Form
router.get('/register',(req,res)=>{
    res.render('register');
});

//handle Sign Up Logic
router.post('/register',(req,res)=>{
    let newUser = new User({username : req.body.username});
    User.register(newUser,req.body.password,(err,user)=>{
        if(err){
            req.flash('error',err.message);
            return res.redirect('/register');
        }
        passport.authenticate('local')(req,res,()=>{
            req.flash('success',`Welcome to Yelpcamp ${user.username}`);
            res.redirect('/campgrounds');
        });
    });
});

//show login form
router.get('/login',(req,res)=>{
    res.render('login');
});

//handle login logic
// app.post('/login',middleware,callback);
router.post('/login',passport.authenticate('local',{
    successRedirect : '/campgrounds',
    failureRedirect : '/login'
}),(req,res)=>{});

//logout Route
router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success','Logged You Out')
    res.redirect('/campgrounds');
});


module.exports = router;
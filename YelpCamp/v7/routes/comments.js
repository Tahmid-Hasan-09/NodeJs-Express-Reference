const express    = require('express'),
      router     = express.Router({mergeParams:true}),//{mergeParams:true}-No need if rout not shortened
      Campground = require('../models/campground'),
      Comment    = require('../models/comment');

//Form For New Comments
router.get('/new',isLoggedIn,(req,res)=>{ //Route = '/campgrounds/:id/comments/new'
    //find campground by Id
    Campground.findById(req.params.id,(err,foundCampground)=>{
        if(err){
            console.log(err);
        }else{
            res.render('comments/new',{campground:foundCampground});
        }
    });    
});

//Comments Create
router.post('/',isLoggedIn,(req,res)=>{ //Route = '/campgrounds/:id/comments'
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

//middleware function
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;
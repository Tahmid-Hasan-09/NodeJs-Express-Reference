//all the middleware goes here
let middlewareObj = {};
const Campground = require('../models/campground'),
      Comment    = require('../models/comment');

//Check Campground Ownership
middlewareObj.checkCampgroundOwnership = function(req,res,next){
    //is user logged in?
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,(err,foundCampground)=>{
            if(err){
                res.redirect('back');
            }else{
                //does user own the campground?
                if(foundCampground.author.id.equals(req.user._id)){
                    //can edit,update,delete
                    next();
                }else{
                    //otherwise, redirect
                    res.redirect('back');
                }
            }
        });                               
    }else{
        //if not,redirect
        res.redirect('back');
    } 
}

//check comment ownership
middlewareObj.checkCommentOwnership = function(req,res,next){
    //is user looged in?
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,(err,foundComment)=>{
            if(err){
                res.redirect('back');
            }else{
                //doer user own the comment?
                if(foundComment.author.id.equals(req.user._id)){
                    //If yes,then can edit/delete
                    next();
                }else{
                    //otherwise,redirect
                    res.redirect('back');
                }                
            }
        })    
    }else{
        //If not,redirect
        res.redirect('back');
    }
}

//middleware function
middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}


module.exports = middlewareObj;
const express    = require('express'),
      router     = express.Router({mergeParams:true}),//{mergeParams:true}-No need if rout not shortened
      Campground = require('../models/campground'),
      Comment    = require('../models/comment'),
      middleware = require('../middleware');

//Form For New Comments
router.get('/new',middleware.isLoggedIn,(req,res)=>{ //Route = '/campgrounds/:id/comments/new'
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
router.post('/',middleware.isLoggedIn,(req,res)=>{ //Route = '/campgrounds/:id/comments'
    //lookup campground using id
    Campground.findById(req.params.id,(err,campground)=>{
        if(err){
            console.log(err);
            res.redirect('/campgrounds');
        }else{
            //create new comment
            Comment.create(req.body.comment,(err,comment)=>{
                if(err){
                    req.flash('error','Something went wrong');
                    console.log(err);
                }else{
                    //Add username and id to Comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save Comment
                    comment.save();
                    //connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();

                    req.flash('success','Successfully Added Comment');
                    //redirect to campground show page
                    res.redirect(`/campgrounds/${campground._id}`);
                }
            })
        }
    });
});

//COMMENT EDIT ROUTE
router.get('/:comment_id/edit',middleware.checkCommentOwnership,(req,res)=>{
    Comment.findById(req.params.comment_id,(err,foundComment)=>{
        res.render('comments/edit',{campground_id:req.params.id, comment:foundComment});   
    });
});

//COMMENT UPDATE ROUTE
router.put('/:comment_id',middleware.checkCommentOwnership,(req,res)=>{
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,(err,updatedComment)=>{
        if(err){
            res.redirect('back');
        }else{
            req.flash('success','Comment Updated');
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    });
});

//COMMENT DESTROY ROUTE
router.delete('/:comment_id',middleware.checkCommentOwnership,(req,res)=>{
    //findbyIdandRemove
    Comment.findByIdAndRemove(req.params.comment_id,(err)=>{
        if(err){
            res.redirect('back');
        }else{
            req.flash('success','Comment Deleted');
            res.redirect(`/campgrounds/${req.params.id}`);
        }
    });
});


module.exports = router;
const mongoose   = require('mongoose'),
      Campground = require('./models/campground'),
      Comment    = require('./models/comment');


let data = [
    {
        name : "Cloud's Rest",
        image : "https://images.pexels.com/photos/2114014/pexels-photo-2114014.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        description : "blah blah blah"
    },
    {
        name : "Desert Mesa",
        image : "https://image.shutterstock.com/image-photo/breathtaking-view-on-west-mitten-600w-1722854560.jpg",
        description : "blah blah blah"
    },
    {
        name : "Canyon Floor",
        image : "https://image.shutterstock.com/image-photo/fruita-canyon-steep-lined-towering-600w-1425905483.jpg",
        description : "blah blah blah"
    }
]

function seedDB(){
    //Remove all Campgrounds
    Campground.remove({},(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log('Campgrounds Removed!!');
            //Add a few Campgrounds
            data.forEach(campground => {
                Campground.create(campground,(err,createdCampground)=>{
                    if(err){
                        console.log(err);
                    }else{
                        console.log('Added a campground');
                        //Create A Comment   
                        Comment.create({
                            text:'This place is great,but I wish there was internet',
                            author : 'Homer'
                        },(err,comment)=>{
                            if(err){
                                console.log(err);
                            }else{
                                createdCampground.comments.push(comment);
                                createdCampground.save();
                                console.log('Created New Comment');
                            }
                        });
                    }
                });                
            });             
        }
    });    
}


module.exports = seedDB;
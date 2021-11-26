//mongoose SETUP
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/demo_blog',{useNewUrlParser:true});

//POST-title,content
const postSchema = new mongoose.Schema({
    title:String,
    content:String
});
const Post = mongoose.model('Post',postSchema);

//USER-email,name
const userSchema = new mongoose.Schema({
    email:String,
    name:String,
    posts:[postSchema]
});
const User = mongoose.model('User',userSchema);

/*-------------Create New User----------- */
// let newUser = new User({
//     email:'harmione@hogwarts.edu',
//     name: 'Hermione Granger'
// });

// newUser.posts.push({
//     title:'How to bre polyjuice potion',
//     content:'Just Kidding. Go to potions class to learn it!'
// });

// newUser.save((err,user)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log(user);
//     }
// });

/*-------------Create New Post----------- */
// let newPost = new Post({
//     title : 'Reflections on Apples',
//     content : 'They are delicious'
// });

// newPost.save((err,post)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log(post);
//     }
// });

/*-------------Finding A Existing User----------- */
User.findOne({name:'Hermione Granger'},(err,user)=>{
    if(err){
        console.log(err);
    }else{
        // console.log(user);
        user.posts.push({
            title:'3 things I really hate',
            content:'Voldemort. Voldemort. Voldemort'
        });
        user.save((err,user)=>{
            if(err){
                console.log(err);
            }else{
                console.log(user);
            }
        });
    }
});
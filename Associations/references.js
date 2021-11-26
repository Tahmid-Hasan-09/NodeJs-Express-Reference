//mongoose SETUP
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/demo_blog_2',{useNewUrlParser:true});
//Require Post Model
const Post = require('./models/post'); //CurrentDirectoryDefinedAs = ./
//Require User Model
const User = require('./models/user');

/*------------CreatePost>FindUser>SavePostToUser------------*/
// Post.create({
//     title : 'How to cook the best burger part 4',
//     content : 'This is number 3 Array'
// },(err,post)=>{
//     //console.log(post);
//     User.findOne({email : 'bob@gmail.com'},(err,foundUser)=>{
//         if(err){
//             console.log(err);
//         }else{
//             foundUser.posts.push(post);
//             foundUser.save((err,data)=>{
//                 if(err){
//                     console.log(err);
//                 }else{
//                     console.log(data);
//                 }
//             });
//         }
//     });
// });

/*-----------SimplyCreatingUser-----------*/
// User.create({
//    email : 'bob@gmail.com',
//    name : 'Bob Belcher' 
// });

/*---------FindUser&FindAllPostsForThatUser----------*/
User.findOne({email:'bob@gmail.com'}).populate('posts').exec((err,user)=>{
    if(err){
        console.log(err);
    }else{
        console.log(user);
    }
});


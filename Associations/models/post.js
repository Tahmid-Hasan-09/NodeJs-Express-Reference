const mongoose = require('mongoose');
//POST-title,content
//Schema
const postSchema = new mongoose.Schema({
    title:String,
    content:String
});
//Model
// const Post = mongoose.model('Post',postSchema);
// module.exports = Post;
module.exports = mongoose.model('Post',postSchema);
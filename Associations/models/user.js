const mongoose = require('mongoose');
//USER-email,name
//Schema SETUP
const userSchema = new mongoose.Schema({
    email:String,
    name:String,
    posts:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Post'
        }
    ]
});
//Send User Model
module.exports = mongoose.model('User',userSchema);
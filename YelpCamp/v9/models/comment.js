//mongoose SETUP
const mongoose = require('mongoose');
//Schema SETUP
const commentSchema = new mongoose.Schema({
    text   : String,
    author : {
        id :{
            type : mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username:String
    }
});

//Model Sent
module.exports = mongoose.model('Comment',commentSchema);
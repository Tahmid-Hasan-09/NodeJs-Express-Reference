//mongoose SETUP
const mongoose = require('mongoose');
//Schema SETUP
const commentSchema = new mongoose.Schema({
    text   : String,
    author : String
});

//Model Sent
module.exports = mongoose.model('Comment',commentSchema);
//mongoose SETUP
const mongoose = require('mongoose');

//SCHEMA SETUP
let campgroundSchema = mongoose.Schema({
    name : String,
    image : String,
    description: String,
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Comment'
        }
    ]
});

//MODEL SETUP & SEND MODEL
module.exports = mongoose.model('Campground',campgroundSchema);
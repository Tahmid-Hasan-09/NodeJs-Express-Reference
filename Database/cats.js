const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/yelp_camp'); //Old Version
mongoose.connect('mongodb://localhost:27017/yelp_camp',{useNewUrlParser:true});

//Schema to define the pattern of the new data/object
const catSchema = new mongoose.Schema({
    name:String,
    age:Number,
    temperament:String
});

//Creating Model and schema compiled into model
let Cat = mongoose.model("Cat",catSchema);


//     /* One method of Creating Data/Object and Saving into DB(Two Steps) */
// //Adding a new cat to the Database
// let george = new Cat({
//     name:"Mrs. Norris",
//     age:7,
//     temperament:"Evil"
// });

// //Save it to the database
// george.save((err,cat) => {
//     if(err){
//         console.log("Something went Wrong!");
//     }else{
//         console.log("We just saved a cat to the DB:");
//         console.log(cat);
//     }
// });

    /* Another method of Creating Data/Object and Saving into DB(One Steps) */
Cat.create({
    name:"Snow White",
    age:15,
    temperament:"Bland"
},(err,cat) => {
    if(err){
        console.log("There is an ERROR!");
        console.log(err);
    }else{
        console.log("One Cat has been saved...");
        console.log(cat);
    }
});

//Retrieve all cats from the DB and console.log each one
Cat.find({},(err,cats) => {
    if(err){
        console.log("OH No,ERROR!");
        console.log(err);
    }else{
        console.log("All the CATS ........");
        console.log(cats);
    }
});
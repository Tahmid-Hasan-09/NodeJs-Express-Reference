const bodyParser       = require('body-parser'),
      expressSanitizer = require('express-sanitizer'),
      methodOverride   = require('method-override'),
      mongoose         = require('mongoose'),
      PORT             = 3000,
      express          = require('express'),
      app              = express();

// APP Config
mongoose.connect('mongodb://localhost:27017/restful_blog_app',{useNewUrlParser:true});
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(methodOverride('_method'));

//Mongoose SCHEMA Setup
const blogSchema = new mongoose.Schema({
    title:String,
    image:String,
    body:String,
    created:{type:Date,default:Date.now}
});

//Mongoose Model Setup
const Blog = mongoose.model('Blog',blogSchema);

//RESTFUL Routes

//HOME Route
app.get('/',(req,res)=>{
    res.redirect('/blogs');
})
//INDEX Route
app.get('/blogs',(req,res) => {
    Blog.find({},(err,blogs)=>{
        if(err){
            console.log('ERROR!');
        }else{
            res.render('index',{blogs:blogs});
        }
    });    
});

//NEW Route
app.get('/blogs/new',(req,res) =>{
    res.render('new');
});

//CREATE Route
app.post('/blogs',(req,res)=>{
    // let newBlog = req.body.blog; 

    // console.log(req.body); //Before Sanitizing
    req.body.blog.body = req.sanitize(req.body.blog.body);
    // console.log(req.body); //After Sanitizing

    //Create Blog
    Blog.create(req.body.blog,(err,newBlog)=>{
        if(err){
            res.render('new');
        }else{
            //then,redirect to the index
            res.redirect('/blogs');
        }
    });
});

//SHOW Route
app.get('/blogs/:id',(req,res)=>{
   Blog.findById(req.params.id,(err,foundBlog)=>{
        if(err){
            res.redirect('/blogs');
        }else{
            res.render('show',{blog:foundBlog});
        }
   });    
});

//EDIT ROUTE
app.get('/blogs/:id/edit',(req,res)=>{
    Blog.findById(req.params.id,(err,foundBlog)=>{
        if(err){
            res.redirect('/blogs');
        }else{
            res.render('edit',{blog:foundBlog});
        }
    });   
});

//UPDATE ROUTE
app.put('/blogs/:id',(req,res)=>{
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id,req.body.blog,(err,updatedBlog)=>{
        if(err){
            res.redirect('/blogs');
        }else{
            res.redirect('HELLO');
        }
    });
});

//DELETE ROUTE
app.delete('/blogs/:id',(req,res)=>{
    Blog.findByIdAndRemove(req.params.id,(err)=>{
        if(err){
            res.redirect('/blogs');
        }else{
            res.redirect('/blogs');
        }
    });
});

//Port Setup Route
app.listen(PORT,() => {
    console.log('Server is Running!!');
});
     
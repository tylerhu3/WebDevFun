/* 
Sept 9, 2019 RESTful Routes exercise through implementation of a Tiny Blog
The 7 Routes
Index: Lists all Items
New: Show new form
Create: Create new item and then redirect somewhere
Show: Show info about specific item
Edit: Show edit form one specific item
Update: Update a particular item and redirect somewhere
Destroy: Delete a particular item

We use MongoDB with Mongoose
Some notes on MongoDB:
Once we open up the Mongo Terminal, the following commands are useful:
1. "show dbs": shows all data bases
2. "use database_Name": opens up the database we specify
3. "show collections": shows the collection names
4. "db.database_Name.find()": will show every item in collection
5. "db.database_Name.drop()": deletes everything in the collection
*/


var express = require("express");
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    app = express(),
    bodyParser = require("body-parser"),
    expressSanitizer = require("express-sanitizer");
//App config
mongoose.connect("mongodb://localhost:27017/blog_app", {useNewUrlParser: true , useFindAndModify: false } );
app.use(bodyParser.urlencoded({extended:true})); //for body parser to parse correctly
app.use(expressSanitizer());
app.use(express.static("public"));// the below tells express to look into public folder for css
app.set("view engine", "ejs");//  makes it so we dont have to add .ejs to the files we render, its just default now
app.use(methodOverride('_method')); //ERROR not working currently so had to use post for everything
//Mongoose Model for DB
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var blog = mongoose.model("Blog", blogSchema);
var appName = "Blog 1.0";

//INDEX Route
//The root here is redirected to blog below
app.get("/", function(req, res){
    res.redirect("/blog");
});

//Index Route
//the get request to post things from the blog
app.get("/blog", function(req, res){
    blog.find({}, function(err, blogs){
        if(err){
            console.log("encounter error at /blog");
        }
        else{
            res.render("index", {blogs: blogs, appName: appName});
        }
    } );
    
});

//the post request to add to blog db
//CREATE ROUTE --new.ejs
app.post("/blog", function(req, res){ 
    console.log(req.body);
    req.body.blog.body = req.sanitize(req.body.blog.body);
    console.log("=================");
    console.log(req.body);
    blog.create(req.body.blog, function(err, newBlog){
        if(err){
            console.log("encouter error at post /blog");
            res.render("new");
        }
        else{
            res.redirect("blog");
        }
    } );
    
});

//NEW Route
app.get("/blog/new", function(req, res){
    res.render("new");
});

//SHOW Route
//Expanding on a click post:
app.get("/blog/:id", function(req, res){
    blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blog");
        }else{
            res.render("show", {blog: foundBlog});
        }
    });
});

//EDIT Route
app.get("/blog/:id/edit", function(req, res){
    blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blog");
        }else{
            res.render("edit", {blog: foundBlog});
        }
    });
});

//UPDATE ROUTE #1
app.post("/updateblog/:id", function(req, res){
    console.log("Update 1 Params: " + req.params.id + " "+ req.body.blog);
    req.body.blog.body = req.sanitize(req.body.blog.body);
    blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            console.log(err);
            res.redirect("/blog")
        }else{
            res.redirect("/blog/" + req.params.id);
        }
    }); 
});

//DELETE ROUTE
app.post("/blogs/:id/del", function(req, res){
    blog.findByIdAndRemove(req.params.id, function(err,){
        if(err){
            console.log(err);
            res.redirect("blog");
        }else{
            res.redirect("blog");
        }
    })
});


//Required code for any of the above to work 
app.listen(5000,  function () {
    console.log('Blog listening on port 5000, Time: ' + new Date());
});
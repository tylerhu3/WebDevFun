 var express = require("express");
 var app = express();
 var bodyParser = require("body-parser");
 app.use(bodyParser.urlencoded({extended:true}));
 var campGrounds = [
    {name: "DESOTO STATE PARK", image : "https://blog-assets.thedyrt.com/uploads/2019/07/alabama-desoto-state-park_11f17d9623fd6e917e22a40bcb3de1d6.jpg"},
    {name: "HOMER SPIT CAMPGROUND", image : "https://blog-assets.thedyrt.com/uploads/2019/07/homer-spit-campground.jpg"},
    {name: "HAVASU FALLS", image : "https://blog-assets.thedyrt.com/uploads/2019/07/havasufalls.jpg"},
    {name: "PETIT JEAN STATE PARK", image : "https://blog-assets.thedyrt.com/uploads/2019/07/petit-jean-state-park.jpg"},
    {name: "JUMBO ROCKS CAMPGROUND", image : "https://blog-assets.thedyrt.com/uploads/2019/07/jumbo-rocks.jpg"},
    {name: "CHATFIELD STATE PARK", image : "https://blog-assets.thedyrt.com/uploads/2019/07/colorado-chatfield-state-park_27440e615ec12dc03f5f952326608433.jpg"},
    {name: "ROCKY NECK STATE PARK", image : "https://blog-assets.thedyrt.com/uploads/2019/07/rocky-neck.jpeg"},
    {name: "TRAP POND STATE PARK", image : "https://blog-assets.thedyrt.com/uploads/2019/07/trap-pond-state-park.jpeg"}
];
 app.set("view engine", "ejs");
 

 app.get("/", function(req, res){
    res.render("landing.ejs") //loads landing page from views folder
    });

   
app.get("/campgrounds", function(req, res){

    res.render("campgrounds.ejs",  {campGrounds: campGrounds}) 
});

/*
This is where we want to create a new campground,
we will do this by redirecting to 
*/
app.post("/campgrounds", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name : name, image:image};
    campGrounds.push(newCampground);
    res.redirect("/campgrounds"); // by default this will go to "get" request version of "/campgrounds"
});

app.get("/campgrounds/new", function(req, res){

    res.render("new.ejs") 
});


//Required code for any of the above to work 
app.listen(3000,  function () {
    console.log('Webpage listening on port 3000, Time: ' + new Date());
});
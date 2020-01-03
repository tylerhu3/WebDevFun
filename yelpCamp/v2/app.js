/*
YelpCamp V2:
We will be adding mongoose and proper inserting of data into mongoose.
*/

/*
Below we have all the requirement tools, framework, db, packages, initialized and ready for use
*/
var express = require("express"), //use express
    app = express(), //initialize express 
    bodyParser = require("body-parser"), //body parser to help us gather data from req side
    mongoose = require("mongoose");


/*
Below is having express actually using those packages
*/
app.use(bodyParser.urlencoded({ extended: true })); //this line is required according to Colt Steele from Udemy
app.set("view engine", "ejs");

/*Create a database with the below*/
mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true, useUnifiedTopology: true });


//SCHEMA SETUP DB
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

Campground.create(
    {name: "HOMER SPIT CAMPGROUND",
     image : "https://blog-assets.thedyrt.com/uploads/2019/07/homer-spit-campground.jpg",
    description: "Huge granite hill with no bathrooms, no water, just for site seeing"},
    function(err, campground){
        if(err){
            console.log(err);
        }
        else{
            console.log("New campground created");
            console.log(campground)
        }
    }
    )

var campGrounds = [
    { name: "DESOTO STATE PARK", image: "https://blog-assets.thedyrt.com/uploads/2019/07/alabama-desoto-state-park_11f17d9623fd6e917e22a40bcb3de1d6.jpg" },
    { name: "HOMER SPIT CAMPGROUND", image: "https://blog-assets.thedyrt.com/uploads/2019/07/homer-spit-campground.jpg" },
    { name: "HAVASU FALLS", image: "https://blog-assets.thedyrt.com/uploads/2019/07/havasufalls.jpg" },
    { name: "PETIT JEAN STATE PARK", image: "https://blog-assets.thedyrt.com/uploads/2019/07/petit-jean-state-park.jpg" },
    { name: "JUMBO ROCKS CAMPGROUND", image: "https://blog-assets.thedyrt.com/uploads/2019/07/jumbo-rocks.jpg" },
    { name: "CHATFIELD STATE PARK", image: "https://blog-assets.thedyrt.com/uploads/2019/07/colorado-chatfield-state-park_27440e615ec12dc03f5f952326608433.jpg" },
    { name: "ROCKY NECK STATE PARK", image: "https://blog-assets.thedyrt.com/uploads/2019/07/rocky-neck.jpeg" },
    { name: "TRAP POND STATE PARK", image: "https://blog-assets.thedyrt.com/uploads/2019/07/trap-pond-state-park.jpeg" }
];



app.get("/", function (req, res) {
    res.render("landing.ejs") //loads landing page from views folder
});


//INDEX Route - show all campgrounds
app.get("/campgrounds", function (req, res) {
    //get all campgrounds from database
    Campground.find({}, function (err, campgroundsReturned) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds.ejs", { campGrounds: campgroundsReturned })
        }
    });

});

/*
CREATE Route - add new campground to DB
*/
app.post("/campgrounds", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = { name: name, image: image };
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/campgrounds");
        }
    })

});

/*
NEW Route - show form to create new campground
*/
app.get("/campgrounds/new", function (req, res) {

    res.render("new.ejs")
});

/*
SHOW Route - given an id, we will show element information corressponding
to the id passed in, notice that this must be after the NEW Route above
otherwise, this the NEW Route will never get excited because this will
catch it, as we will accept anything pass campgrounds/
*/
app.get("/campgrounds/:id", function (req, res) {

})


//Required code for any of the above to work 
app.listen(3000, function () {
    console.log('Webpage listening on port 3000, Time: ' + new Date());
});
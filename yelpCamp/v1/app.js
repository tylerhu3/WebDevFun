 var express = require("express");
 var app = express();

 app.get("/", function(req, res){
    res.send("This will be landing page soon!");
    });

//Required code for any of the above to work 
app.listen(3000,  function () {
    console.log('Webpage listening on port 3000, Time: ' + new Date());
});
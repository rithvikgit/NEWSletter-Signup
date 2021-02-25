const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req, res){

  const firstName = req.body.fname;
  const lastName =  req.body.lname;
  const email = req.body.email;


  var data = {
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  var jasonData = JSON.stringify(data);

  const url = 'https://us10.api.mailchimp.com/#mailchimp_apikey';

  const options={
    method:"POST",
    auth: "rithvik_12:36f4a381fb95006ca81ff8f17d029d3c-us10"
  }

  const request =  https.request(url, options, function(response){

    if(response.statusCode === 200){
      res.send("sucessfully subscribed");
    }else{
      res.send("there wasa an error with signing up,please try again");
    }

     response.on("data", function(data){
       console.log(JSON.parse(data));
     });

   });

   request.write(jsonData);
   request.end();

  // console.log(firstName, lastName, email);

});




app.listen(3000, function(){
  console.log("server is running on port 3000");
});











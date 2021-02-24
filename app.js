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

  const url = 'https://us10.api.mailchimp.com/3.0/5d1e309d99';

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










// --data '{"name":"Freddie'\''s Favorite Hats","contact":{"company":"Mailchimp","address1":"675 Ponce De Leon Ave NE","address2":"Suite 5000","city":"Atlanta","state":"GA","zip":"30308","country":"US","phone":""},"permission_reminder":"You'\''re receiving this email because you signed up for updates about Freddie'\''s newest hats.","campaign_defaults":{"from_name":"Freddie","from_email":"freddie@freddiehats.com","subject":"","language":"en"},"email_type_option":true}' \


// apikey
// 36f4a381fb95006ca81ff8f17d029d3c-us10

// List id
// 5d1e309d99

// list id
// 5d1e309d99

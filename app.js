const express = require('express');

const request = require('request');

const bodyParser = require('body-parser');

const app = express();

const https = require('https');


app.use(express.static("public"));

app.use(bodyParser.urlencoded({encoded: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {

  const fName = req.body.firstName;
  const lName = req.body.lastName;
  const eMail = req.body.email;


  const data = {
    members: [
      {
        email_address: eMail,
        status: "subscribed",
        merge_fields: {
          FNAME: fName,
          LNAME: lName
        }
      }
    ]
  }

  const jsonData = JSON.stringify(data);

  const url = "https://us12.api.mailchimp.com/3.0/lists/fd47f92841";

  const options = {
    method: "POST",
    auth: "s-zode:b5d53ee9e758693f4d2d2ca3a7ad95ab-us12"

  }

  const request = https.request(url, options, function(response){
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html")
    }
    else {
      res.sendFile(__dirname + "/failure.html")
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();
})

app.post("/failure", function(req, res){
  res.redirect("/")
})








app.listen(process.env.PORT || 3000, function(){
  console.log("serves is running on port 3000");
})

// b5d53ee9e758693f4d2d2ca3a7ad95ab-us12


// fd47f92841

// this is for us to use the express
const { response } = require("express");
const express = require("express");

//this is calling the express app as an app.
const app = express();

//port we using
const port = 3000;

const bodyparser = require("body-parser");

const https = require("https");

app.use(bodyparser.urlencoded({ extended: true }));

//the request we get and we give a response.
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  // we are making a external request to another server using the url
  const query = req.body.cityName;
  const apikey = "150a3ff2b30b6a0ff0a1893c570384b5";
  const units = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&units=" +
    units +
    "&appid=" +
    apikey;

  // this is the request we made using the hhtps.get anf the url plus the call back function which gives
  // us a response of the request.
  https.get(url, function (response) {
    console.log(response);

    response.on("data", function (data) {
      const weatherDate = JSON.parse(data);
      const temp = weatherDate.main.temp;
      const WeatherDescription = weatherDate.weather[0].description;
      const icon = weatherDate.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<p>The weather is currently " + WeatherDescription + "</p>");
      res.write(
        "<h1>the weather in " + query + " is " + temp + " degree Celcuis </h1>"
      );
      res.write("<img src=" + imageURL + ">");

      res.send();
    });
  });
});

// this listens for port 3000 connection and tell us if its working.
app.listen(port, function () {
  console.log("sever 3000");
});

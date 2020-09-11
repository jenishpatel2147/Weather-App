const express = require('express');
const https = require('https');

var app = express();

// Will need this to include jQuery in Node.js
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );

app.get('/', function (req, res) {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=203ef18947ce5c667130ee82a9708b18";
   
    https.get(url, function(response) {
        console.log(response.statusCode);

        $("h1").text(response.statusCode);
        response.on("data", function(stuff) {
            const weatherData = JSON.parse(stuff);
            console.log(weatherData);
        });
    });

    res.sendFile(__dirname+ "\\main.html");
});

app.listen(3000, function() {
    console.log("Server running successfully");
});

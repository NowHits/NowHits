//imports
const express = require('express');
const app = express();
const port = 80;
const hbs = require('express-handlebars');
const fs = require('fs');
const colors = require('colors');
const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const request = require('request');

//public folder
app.use(express.static('public'));

app.set('view engine', 'hbs');

app.engine('hbs', hbs( {
  extname: "hbs",
  defaultview: "main",
  layoutsDir: __dirname + "/views/layouts/",
  partialsDir: __dirname + "/views/partials/"
}));

var requestOptions = {
    uri: 'http://radio.nowhits.uk:8000/stats?sid=1&pass=7Ld6dYkR&json=1',
    json:true
}
var info = request(requestOptions, function(error, response, body){
    var response = body
    return response;
});

app.get('/', (req, res) => {
  params = req.query
  if (params.password != "luagay") {
    res.render('error', {
      title: "Error",
      code: "401",
      desc: "Unauthorised"
    });
    return;
  }
  res.render('index', {
    title: "Home",
    currentListeners: "help"
  });
});

app.get('*', (req, res) => {
  res.render('error', {
    title: "Error",
    code: "404",
    desc: "Not Found"
  });
});

app.listen(port, () => console.log(`Listening on port ${port}!`.cyan));

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
var metrics = {}
//public folder
app.use(express.static('public'));

app.set('view engine', 'hbs');

app.engine('hbs', hbs( {
  extname: "hbs",
  defaultview: "main",
  layoutsDir: __dirname + "/views/layouts/",
  partialsDir: __dirname + "/views/partials/"
}));

var config = JSON.parse(fs.readFileSync('./public/config.json'))

/*app.get('*', (req, res) => {
  if (config.lockdown == true) {
    res.render('emergency')
  }
});*/

var requestOptions = {
  uri: 'http://radio.nowhits.uk:8000/stats?sid=1&pass=7Ld6dYkR&json=1',
  json:true
}

request(requestOptions, function metricFetch(error, response, body){
  metrics = body;
  return metrics;
});

console.log(metrics);

app.get('/', (req, res) => {
  request(requestOptions, function metricFetch(error, response, body){
    metrics = body;
    return metrics;
  });
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
    currentListeners: metrics.currentlisteners,
    songTitle: metrics.songtitle
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

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

/*request('http://radio.nowhits.uk:8000/stats?sid=1&pass=7Ld6dYkR&json=1', function (error, response, body) {
  console.log('body:', body);
});*/

app.get('/', (req, res) => {

  res.render('index', {
    title: "Home",
    currentListeners: request('http://radio.nowhits.uk:8000/stats?sid=1&pass=7Ld6dYkR&json=1').currentlisteners
  });
});

app.listen(port, () => console.log(`Listening on port ${port}!`.cyan));

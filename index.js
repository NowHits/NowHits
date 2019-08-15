//imports
const express = require('express');
const app = express();
const port = 8000;
const hbs = require('express-handlebars');
const fs = require('fs');
const colors = require('colors');
const mongo = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017'

//public folder
app.use(express.static('public'));

mongo.connect(url, (err, client) => {
  if (err) {
    console.error(err)
    return
  }
  const db = client.db('nowHits')
  const collection = db.collection('djs')
})

app.set('view engine', 'hbs');

app.engine('hbs', hbs( {
  extname: "hbs",
  defaultview: "main",
  layoutsDir: __dirname + "/views/layouts/",
  partialsDir: __dirname + "/views/partials/"
}));

app.get('/', (req, res) => {
  res.render('index', {
    title: "Home"
  });
});

app.listen(port, () => console.log(`Listening on port ${port}!`.cyan));

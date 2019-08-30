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

var announcement = JSON.parse(fs.readFileSync('./public/announcement.json'))

var requestOptions = {
  uri: 'http://radio.nowhits.uk/api/nowplaying/1',
  json:true
}

request(requestOptions, function metricFetch(error, response, body){
  metrics = body;
  return metrics;
});

function updateClock() {
  request(requestOptions, function metricFetch(error, response, body){
    metrics = body;
    return metrics;
    console.log("updated. Metrics:", metrics);
  });
}
setInterval(updateClock, 5000);

app.get('/', (req, res) => {
  request(requestOptions, function metricFetch(error, response, body){
    metrics = body;
    console.log("new");
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

  if (metrics.live.is_live == false) {
    dj = "NowHits";
    //metrics.now_playing.song.art = "https://cdn.discordapp.com/icons/607583026112888839/475dbb4dbee00098fd1476aaf91c0899.png?size=128";
  } else {
    console.log(metrics.live.is_live);
    dj = metrics.live.streamer_name;
  }
  res.render('index', {
    title: "Home",
    currentListeners: metrics.listeners.current,
    songTitle: metrics.now_playing.song.text,
    songart: "https://cdn.discordapp.com/icons/607583026112888839/475dbb4dbee00098fd1476aaf91c0899.png?size=128",
    latestAnnouncement: announcement.latest,
    dj: dj
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

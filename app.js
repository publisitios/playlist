// load application dependencies 
var express = require('express');
var sqlite3 = require('sqlite3');
var fs = require('fs');
var mustache = require('Mustache');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var request = require('request');

var db = new sqlite3.Database('./playlist.db');
var app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(methodOverride('_method'));



// view playlist READ  
app.get('/', function(req, res) {

  db.all('SELECT * FROM playlist;', function(err, songs) {

    var playlist_arr = []
    songs.forEach(function(el) {
      playlist_arr.push(el.video_ID)
    });
    //console.log(playlist_arr);
    var playlist = playlist_arr.join(",");

    //console.log(playlist);

    //var playlist = '5-aB4wtWiYI,kxxWlsOSPTY,3mB8V9Lz7u0'; // hard coded playlist 

    var template = fs.readFileSync('./views/template.html', 'utf-8'); // load HTML template
    var htmlVariables = mustache.render(template, {
      "songs": songs,
      "playlist": playlist
    });

    //console.log(songs);
    res.send(htmlVariables);

  });
  /// add songs CREATE
  app.post('/playlist/add', function(req, res) {

    //console.log(req.body.video_URL);

    video_URL = req.body.video_URL;

    // regular expresion to extract You Tube video ID 
    // taken from http://stackoverflow.com/questions/3452546/javascript-regex-how-to-get-youtube-video-id-from-url
    var regExp = /^.*(youtu.be\/|v\/|embed\/|watch\?|youtube.com\/user\/[^#]*#([^\/]*?\/)*)\??v?=?([^#\&\?]*).*/;
    var match = video_URL.match(regExp);
    //console.log(match);
    if (match && match[3].length == 11) {
      var video_ID = match[3];


      // get the video title by making an API call to YouTube using the ID

      var APIurl = "http://gdata.youtube.com/feeds/api/videos?q=" + video_ID + "&max-results=1&v=2&alt=jsonc";
      console.log(APIurl);
      // request the data from Intagram API 
      request(APIurl, function(error, response, body) {
        console.log(body);
        var parsed = JSON.parse(body);
        var APIdata = parsed.data;
        var title = APIdata.items[0].title;

        // set rating to 1 as initial value
        var rating = 1;
        db.run("INSERT INTO playlist (title, rating, video_ID, video_URL) VALUES ('" + title + "','" + rating + "','" + video_ID + "','" + video_URL + "');");
        res.redirect('/');
      });

    } else {
      console.log("error! wrong URL!!!");
    }

  });


  // rate songs UPDATE
  app.put('/playlist/rate/:id', function(req, res) {
    var id = req.params.id;
    console.log(req.body);

    console.log(id);
    console.log(req.body.rating);
    db.run("UPDATE playlist SET rating =  '" + req.body.rating + "' WHERE id = " + id + ";");

    res.redirect('/');
  });
});

// remove songs DELETE
app.delete('/playlist/delete/:id', function(req, res) {
  var id = req.params.id;
  db.run("DELETE FROM playlist WHERE id = " + id + ";");
  res.redirect('/');

});

app.listen(2000, function() {
  console.log("LISTENING ON PORT 2000!");
});
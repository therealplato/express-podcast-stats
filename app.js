//podcoin podcast server

var express = require('express');
var app = module.exports = express.createServer();

//we will store server state in app.podcoin for now
app.podcoin={};

app.podcoin.data={
  episodes = 
  [ coinbase004: { 
      episodeTitle:"Coinbase 004: Sex, Drugs, Booty",
      episodeID:'coinbase004',
      episodeNumber:'004',
      episodeURL:"http://library.agoristradio.com/library/coinbase/coinbase-EP004.mp3",
      scriptHead: "alert('avaderp kevadra')",
      scriptBody: "",
    },
    stats = 
    {
      mp3downloads:0,
      streamStarted:0,
      streamCompleted:0
    }
  ],
  coinbase005: null,
    ],
  client:{},    // we build this for each request and pass to jade
};



// Configuration

app.configure(function(){
  app.set('views', __dirname);
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'http://agoristradio.com/?p=547' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// Routes
// var  = require('./routes');

app.get('/coinbase/listen/:id', function(req, res){
  var id = req.params.id;
  var tmp = app.podcoin.data.client;
  tmp.episode = app.podcoin.getEpisode(id);
  tmp.user = null;

  res.render('stream.jade', {podcoin: tmp});

});

app.podcoin.getEp = function(id){
  return(app.podcoin.data.episodes[toString(id)]);
};

app.podcoin.newEp = function(){
  return {
    episodeTitle:"",
    episodeNumber:null,
    episodeURL:null,
    scriptHead: "",
    scriptBody: "",
  },
};

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.configure('production', function(){
  app.use(express.errorHandler());
});

app.listen(3000);
console.log("Hit me up. %d in %s mode", app.address().port, app.settings.env);

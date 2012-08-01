//podcoin podcast server

var express = require('express');
var app = module.exports = express.createServer();

//we will store server state in app.podcoin for now
app.podcoin = {};
  app.podcoin.data = {};
    app.podcoin.data.episodes = {};
      app.podcoin.data.episodes.coinbase004 =
      { 
        title:"Coinbase 004: Sex, Drugs, Booty",
        id:'coinbase004',
        number:'004',
        URL:"http://library.agoristradio.com/library/coinbase/coinbase-EP004.mp3",
      };

    app.podcoin.data.stats =
    {
      mp3downloads:0,
      streamStarted:0,
      streamCompleted:0
    };

    app.podcoin.data.client=    // we build this for each request and pass to jade
    {
      scriptHead: "alert('avaderp kevadra')",
      scriptBody: "",
    };



// Configuration

app.configure(function(){
  app.set('views', __dirname);
  app.set('view engine', 'jade');
  app.set('view options', {layout:false});
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'http://agoristradio.com/?p=547' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// Routes
// var  = require('./routes');

app.get('/listen/:id', function(req, res){
  var id = req.params.id;
  var tmp = app.podcoin.data.client;
  tmp.ep = app.podcoin.getEp(id);
  console.log('url:: '+tmp.ep.URL);
  if(tmp.ep == null){
    res.send(404);
  } else {
    tmp.user = null;
    res.render('listen.jade', {podcoin: tmp});
  };
});
app.get('/*', function(req, res){
  res.send('<html><a href=/listen/coinbase004>episode 4</a></html>');
});

app.podcoin.getEp = function(id){
  tmp = app.podcoin.data.episodes[id];
  if(tmp == null || tmp == undefined || tmp == '') {
    return null;
  } else {
    return tmp;
  };
};

app.podcoin.newEp = function(){
  return {
    title:'',
    id:'',
    number:null,
    URL:null,
  };
};

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.configure('production', function(){
  app.use(express.errorHandler());
});

app.listen(3000);
console.log('listening on 3000');
//console.log("Hit me up. %d in %s mode", app.address().port, app.settings.env);

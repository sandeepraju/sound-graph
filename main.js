var bodyParser = require('body-parser');
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.json());

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('templates/index.html');
});

app.post('/event', function(req, res){
    io.emit('event', req.body);
    res.send({'status': 'success'});
});

io.on('connection', function(socket){});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

var express = require('express');
var app = express();
app.use(express.static(__dirname + '/static'));
console.log(__dirname + '/static');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', function(req, res){
  res.sendfile('templates/index.html');
});


app.get('/event', function(req, res){
    io.emit('event', req.body)
    res.send({'status': 'success'});
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.bodyParser());

app.get('/', function(req, res){
  res.sendfile('templates/index.html');
});


app.get('/event', function(req, res){
    io.emit('event', req.body)
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

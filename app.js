var express = require('express');
var http = require('http');
var app = express();
var server = http.Server(app);
var io = require('socket.io')(server);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/app/index.html');
});

app.use('/css', express.static(__dirname + '/app/assets/css'));
app.use('/js', express.static(__dirname + '/app/assets/js'));
app.use('/img', express.static(__dirname + '/app/assets/img'));

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

io.on('connection', function(socket) {
  socket.on('edit', function(data) {
    socket.broadcast.emit('edit', data);
  });
});

server.listen(8080);
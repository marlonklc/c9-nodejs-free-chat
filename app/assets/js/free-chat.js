var socket = io();

var editable = document.getElementsByTagName('code')[0];
editable.addEventListener('keyup', function() {
  socket.emit('edit', editable.innerHTML);
});

socket.on('edit', function(data) {
  editable.innerHTML = data;
});
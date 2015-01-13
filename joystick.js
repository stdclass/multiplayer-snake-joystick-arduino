var serialPortModule = require("serialport"),
    SerialPort = serialPortModule.SerialPort;

var serialPort = new SerialPort("/dev/tty.usbmodem1411", {
    baudrate: 9600,
    parser: serialPortModule.parsers.readline("\n")
});

var io = require('socket.io')(3030);

var socket = false;

io.on("connection", function(s){
   
    socket = s;
    
});

var lastMessage = false;

serialPort.on("open", function () {
    
    serialPort.on('data', function(data) {
        
        if( data != lastMessage )
            socket && socket.emit("move", data);
        
        lastMessage = data;
    });
});

/*
io.on('connection', function (socket) {
  io.emit('this', { will: 'be received by everyone'});

  socket.on('private message', function (from, msg) {
    console.log('I received a private message by ', from, ' saying ', msg);
  });

  socket.on('disconnect', function () {
    io.sockets.emit('user disconnected');
  });
});*/
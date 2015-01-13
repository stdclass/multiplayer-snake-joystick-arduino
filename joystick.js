var serialPortModule = require("serialport"),
    SerialPort = serialPortModule.SerialPort;

var serialPort = new SerialPort("/dev/tty.usbmodem1411", {
    baudrate: 9600,
    parser: serialPortModule.parsers.readline("\n")
});

var io = require('socket.io')(3030);

var socket = false;

io.on("connection", function(newSocket){
   
    socket = newSocket;
    
});

var lastMessage = false;

serialPort.on("open", function () {
    
    serialPort.on('data', function(data) {
        
        if( data != lastMessage )
            socket && socket.emit("move", data);
        
        lastMessage = data;
        
    });
});

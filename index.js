var SerialPort = require("serialport");

var port = new SerialPort("/dev/tty.SLAB_USBtoUART", {
  baudRate: 38400
});

port.on('open', function() {


  port.write('main screen turn on', function(err) {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
    console.log('message written');
  });
});

// open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message);
})

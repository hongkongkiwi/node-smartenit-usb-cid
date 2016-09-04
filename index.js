var SerialPort = require("serialport");
var Packet = require('./libs/Packet');

var USBCID = function(deviceName, deviceBaud) {
  var instance = this;

  this.port = new SerialPort(deviceName, {
    baudRate: deviceBaud,
    autoOpen: false,
    parser: SerialPort.parsers.raw
  });

  // open errors will be emitted as an error event
  this.port.on('error', function(err) {
    console.log('Error: ', err.message);
  });

  this.port.on('data', function (data) {
    var packet = Packet.parseCommand(data);
    var resp = Packet.RESPONSES;
    switch (Packet.parseCommand(data).cmd) {
      case resp.SYSTEM_PING_RESPONSE:
        console.log('Got Ping Resopnse');
        console.log(packet.systemPingResponse());
        break;
      default:
        console.log('Unknown Message Type');
        break;
    }
  });
}

USBCID.prototype.open = function() {
  if (this.port.isOpen()) {
    return;
  }
  var instance = this;
  this.port.on('open', function() {
    instance.port.write(Packet.systemPing().getBytes(), function(err) {
      if (err) {
        return console.log('Error on write: ', err.message);
      }
    });
  });
  this.port.open();
}

USBCID.prototype.close = function() {
  this.close();
}

USBCID.getPorts = function() {
  SerialPort.list(function (err, ports) {
    for (var port in ports) {
      serialNumber
    }

    ports.forEach(function(port) {
      console.log(port.comName);
      console.log(port);
      console.log(port.manufacturer);
    });
  });
}

USBCID.prototype.ping = function() {

}

module.exports = USBCID;

var usb = new USBCID('/dev/tty.SLAB_USBtoUART', 115200);
usb.open();

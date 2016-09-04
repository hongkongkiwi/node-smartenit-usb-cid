var Packet = require('../libs/Packet');

var packet = Packet.pingDevice();

console.log(packet.getBytes());

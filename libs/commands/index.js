module.exoprts = function(Packet) {
  Packet = require('./BindingCommands');
  Packet = require('./DeviceInfoNetworkCommands');
  Packet = require('./SystemCommands');
  Packet = require('./ClusterCommands');
  Packet = require('./OTACommands');

  return Packet;
}

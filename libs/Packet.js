var _ = require('underscore');
var ByteBuffer = require('byte');
var xor = require('bitwise-xor');

var Packet = function() {};

// Load all commands
Packet = require('./commands')(Packet);

Packet.ZIGBEE_PROFILES = require('./ZigBeeProfiles');

Packet.COMMANDS = require('./Protocol').Commands;
Packet.RESPONSES = require('./Protocol').Responses;

/* Helper Methods */
function decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
        hex = "0" + hex;
    }

    return hex;
}

/* Instance Methods */
Packet.createCommand = function(command, payloadBuf, requestAck) {
  var packet = new Packet();

  packetInfo = Packet._generateOutgoingBytes(command,payloadBuf);

  packet.bytes = packetInfo.bytes;
  packet.sop = packetInfo.sop;
  packet.cmd = packetInfo.cmd;
  packet.len = packetInfo.len;
  packet.pyld = packetInfo.pyld;
  packet.fcs = packetInfo.fcs;

  return packet;
}

Packet.parseCommand = function(buf) {
  var packet = new Packet();

  packetInfo = Packet._processIncomingBytes(buf);

  packet.bytes = packetInfo.bytes;
  packet.sop = packetInfo.sop;
  packet.cmd = packetInfo.cmd;
  packet.len = packetInfo.len;
  packet.pyld = packetInfo.pyld;
  packet.fcs = packetInfo.fcs;

  return packet;
}

/* Internal Methods */
Packet._processIncomingBytes = function(buf) {
  var SOP = buf.readUInt8(0);
  var CMD = buf.readUInt16BE(1);
  var LEN = buf.readUInt8(3);
  var PYLD = buf.slice(4,LEN);
  var FCS = buf.readUInt8(3,4+LEN);

  return {
    bytes: buf,
    sop: SOP,
    cmd: CMD,
    len: LEN,
    pyld: PYLD,
    fcs: FCS
  };
}

Packet._generateOutgoingBytes = function(command, payloadBuf, requestAck) {
  var emptyPayload = (_.isNull(payloadBuf) || _.isUndefined(payloadBuf));
  var payloadSize = emptyPayload ? 0 : payloadBuf.length;

  var SOP = Buffer.alloc(1,0);
  SOP.writeUInt8(0x02);

  var CMD = Buffer.alloc(2,0);
  if (_.isBoolean(requestAck) && requestAck === true) {
    command |= (1 << 14); // set ack request bit
  }
  CMD.writeUInt16BE(command);

  var PYLD = payloadBuf;

  var bytes = Buffer.alloc(SOP.length + CMD.length + 1 + payloadSize + 1,0);
  var fcsCalc = Buffer.alloc(CMD.length + 1 + payloadSize,0);
  var pos = 0;
  var fcsPos = 0;
  SOP.copy(bytes,pos,0,SOP.length);
  pos += SOP.length;

  CMD.copy(bytes,pos,0,CMD.length);
  CMD.copy(fcsCalc,fcsPos,0,CMD.length);
  fcsPos = CMD.length;
  pos += CMD.length;

  if (emptyPayload) {
    bytes.writeUInt8(0x00,pos);
    fcsCalc.writeUInt8(0x00,fcsPos);
    pos += 1;
    fcsPos += 1;
  } else {
    bytes.writeUInt8(payloadSize,pos);
    fcsCalc.writeUInt8(payloadSize,fcsPos);
    pos += 1;
    fcsPos += 1;
    PYLD.copy(bytes,pos,0,PYLD.length);
    PYLD.copy(fcsCalc,fcsPos,0,PYLD.length);
    pos += PYLD.length;
    fcsPos += PYLD.length;
  }

  var FCS = xor(fcsCalc, Buffer.alloc(1,0));

  FCS.copy(bytes,pos,0,1);

  return {
    bytes: bytes,
    sop: SOP,
    cmd: CMD,
    len: payloadSize,
    pyld: PYLD,
    fcs: FCS
  };
}

Packet.prototype.getBytes = function() {
  return this.bytes;
}


/*
  NODE DESCRIPTOR REQUEST
  Get theDestination’s Device Node Descriptor.

  Parameter - Description
  u16DstAdd - Network address of the device generating the inquiry
  u16Interest - Network address of the destination device being queried
*/
Packet.nodeDescriptorRequest = function(u16DstAdd, u16Interest) {
  if (!_.isNumber(u16DstAdd)) {
    throw Error('Must pass a number');
  }
  if (!_.isNumber(u16Interest)) {
    throw Error('Must pass a number');
  }

  return Packet.createCommand(Packet.COMMANDS.NODE_DESCRIPTOR_REQUEST, [u16DstAdd, u16Interest]);
}

/*
  SIMPLE DESCRIPTOR REQUEST
  Get the Destination’s Device Simple Descriptor Information

  Parameter - Description
  u16DstAdd - Network address of the device generating the inquiry
  u16Interest - Network address of the destination device being queried
  u8EndPoint - The application endpoint that sources the data
*/
Packet.simpleDescriptorRequest = function(u16DstAdd, u16Interest, u8EndPoint) {
  if (!_.isNumber(u16DstAdd)) {
    throw Error('Must pass a number');
  }
  if (!_.isNumber(u16Interest)) {
    throw Error('Must pass a number');
  }
  if (!_.isNumber(u8EndPoint)) {
    throw Error('Must pass a number');
  }

  return Packet.createCommand(Packet.COMMANDS.SIMPLE_DESCRIPTOR_REQUEST, [u16DstAdd, u16Interest, u8EndPoint]);
}

/*
  ACTIVE ENDPOINT REQUEST
  Get the Destination’s Device Active Endpoint Information

  Parameter - Description
  u16DstAdd - Network address of the device generating the request
  u16Interest - Network address of the destination device being queried
*/
Packet.activeEndpointRequest = function(u16DstAdd, u16Interest) {
  if (!_.isNumber(u16DstAdd)) {
    throw Error('Must pass a number');
  }
  if (!_.isNumber(u16Interest)) {
    throw Error('Must pass a number');
  }

  return Packet.createCommand(Packet.COMMANDS.ACTIVE_ENDPOINT_REQUEST, [u16DstAdd, u16Interest]);
}

/*
  USER DESCRIPTOR REQUEST
  Get the Destination’s Device User Descriptor Information

  Parameter - Description
  u16SrcAdd - Network address of the device generating the inquiry
  u16DstAdd - Network address of the destination device being queried
*/
Packet.userDescriptorRequest = function(u16SrcAdd, u16DstAdd) {
  if (!_.isNumber(u16SrcAdd)) {
    throw Error('Must pass a number');
  }
  if (!_.isNumber(u16DstAdd)) {
    throw Error('Must pass a number');
  }

  return Packet.createCommand(Packet.COMMANDS.USER_DESCRIPTOR_REQUEST, [u16SrcAdd, u16DstAdd]);
}

/*
  USER DESCRIPTOR SET REQUEST
  Set Destination Device’s User Descriptor Information

  Parameter - Description
  u16SrcAdd - The message’s source network address
  u16Interest - Network address of the described device
  u8DescLen - Length, in bytes, of the user descriptor
  u8Desc[] - User descriptor array (can be up to 16 bytes)
*/
Packet.userDescriptorSetRequest = function(u16SrcAdd, u16Interest, u8DescLen, u8Desc) {
  if (!_.isNumber(u16SrcAdd)) {
    throw Error('Must pass a number');
  }
  if (!_.isNumber(u16Interest)) {
    throw Error('Must pass a number');
  }
  if (!_.isNumber(u8DescLen)) {
    throw Error('Must pass a number');
  }
  if (!_.isArray(u8Desc)) {
    throw Error('Must pass a number');
  }

  return Packet.createCommand(Packet.COMMANDS.USER_DESCRIPTOR_SET_REQUEST, [u16SrcAdd, u16Interest, u8DescLen, u8Desc]);
}

module.exports = Packet;

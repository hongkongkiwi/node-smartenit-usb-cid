var _ = require('underscore');
var ByteBuffer = require('byte');
var xor = require('bitwise-xor');

var Packet = function() {};

function decimalToHex(d, padding) {
    var hex = Number(d).toString(16);
    padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

    while (hex.length < padding) {
        hex = "0" + hex;
    }

    return hex;
}

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

Packet.ZIGBEE_PROFILES = require('./ZigBeeProfiles');

Packet.COMMANDS = require('./Protocol').Commands;
Packet.RESPONSES = require('./Protocol').Responses;

Packet = require('./commands/SystemCommands')(Packet);
Packet = require('./commands/DeviceInfoNetworkCommands')(Packet);
Packet = require('./commands/BindingCommands')(Packet);
Packet = require('./commands/ClusterCommands')(Packet);

/*
  SYSTEM START NETWORK (COORDINATOR)
  Start the network with a given PAN ID

  Parameter - Description
  u16PanID - The desired device’s PAN ID. If 0x0000, the coordinator chooses the ID. THIS PARAMETER IS NOT FUNCTIONAL AT THIS TIME.
  u8Channel - Desired channel number. If 0x00, let coordinator decide
*/
Packet.systemStartNetwork = function(u16PanID, u8Channel) {
  if (!_.isNumber(u16PanID)) {
    throw Error('Must pass a number');
  }
  if (!_.isNumber(u8Channel)) {
    throw Error('Must pass a number');
  }

  return Packet.createCommand(Packet.COMMANDS.SYSTEM_START_NETWORK, [u16PanID, u8Channel]);
}

/*
  SYSTEM START NETWORK RESPONSE (COORDINATOR)
*/
Packet.prototype.systemStartNetworkResponse = function() {
  var u8Channel = this.pyld.readUInt8(0);
  var u16PanID = this.pyld.readUInt8(1);
  var u64ExtPanID = this.pyld.readUInt(2,8);

  return {
    u8Channel: {
      name: 'Channel number that the network was started on',
      value: u8Channel,
    },
    u16PanID: {
      name: 'PAN ID of the current network',
      value: u16PanID,
      hexStr: '0x' + decimalToHex(u16PanID, 2)
    },
    u64ExtPanID: {
      name: 'Extended PAN ID of the current network',
      value: u64ExtPanID,
      hexStr: '0x' + decimalToHex(u64ExtPanID, 8)
    }
  };
}

/*
  JOIN NETWORK (ROUTER)
  Join a PAN

  Parameter - Description
  u16PanID - THIS PARAMETER IS NOT FUNCTIONAL AT THIS TIME.
  u8Channel - Desired channel number to start scanning. If 0x00, let router decide
*/
Packet.systemJoinNetwork = function(u16PanID, u8Channel) {
  if (!_.isNumber(u16PanID)) {
    throw Error('Must pass a number');
  }
  if (!_.isNumber(u8Channel)) {
    throw Error('Must pass a number');
  }

  return Packet.createCommand(Packet.COMMANDS.SYSTEM_JOIN_NETWORK, [u16PanID, u8Channel]);
}

/*
  SYSTEM UPDATE NETWORK RESPONSE
*/
Packet.prototype.systemUpdateNetworkResponse = function() {
  var u8Status = this.pyld.readUInt8(0);

  return {
    u8Status: {
      name: '0 if success, 1 if failure',
      value: u8Status,
    },
  };
}

/*
  SYSTEM UPDATE NETWORK
  Changes Network Parameters

  Parameter - Description
  u16DstAdd - Short address of the destination device(s) (0xFFFD to broadcast to all devices that have their radios on)
  u32ChMask - The desired channel mask
  u8ScanDur - 0x00-0x05: Perform radio channel scan on the set of channels specified through u32ChMask. The
                         time, in seconds, spent scanning each channel is determined by the value of u8ScanDur and
                         the number of scans is equal to the value of u8ScanCount. Valid for unicasts only.
            - 0xFE: Change radio channel to single channel specified through u32ChMask and set the network
                    manager address to that specified through u16NwkMgr. Valid for broadcasts only.
            - 0xFF: Update the stored radio channel mask with that specified through u32ChMask (but do not
                    scan). Valid for broadcasts only.
  u8ScanCount -  Number of energy scans to be conducted and reported. Valid only if a scan has been enabled through u8ScanDur.
*/
Packet.systemUpdateNetwork = function(u16DstAdd, u32ChMask, u8ScanDur, u8ScanCount) {
  if (!_.isNumber(u32ChMask)) {
    throw Error('Must pass a number');
  }
  if (!_.isNumber(u32ChMask)) {
    throw Error('Must pass a number');
  }
  if (!_.isNumber(u8ScanDur)) {
    throw Error('Must pass a number');
  } else if (u8ScanDur > 0xFF) {
    throw Error('Parameter must be less than 0xFF');
  } else if (u8ScanDur > 0x00) {
    throw Error('Parameter must be greater than than 0x00');
  } else if (u8ScanDur > 0x05 && u8ScanDur < 0xFE) {
    throw Error('Parameter must be 0x00-0x05, 0xFE or 0xFF');
  }
  if (!_.isNumber(u8ScanCount)) {
    throw Error('Must pass a number');
  }

  return Packet.createCommand(Packet.COMMANDS.SYSTEM_UPDATE_NETWORK, [u16DstAdd, u32ChMask, u8ScanDur, u8ScanCount]);
}

/*
  REGISTER NODE
  Register IEEE Address and Link Key for a Node

  Parameter - Description
  u64IeeeAdd - The node IEEE address
  u8LnkKey[16] - The node link key (16 bytes)
*/
Packet.registerNode = function(u64IeeeAdd, u8LnkKey) {
  if (!_.isNumber(u64IeeeAdd)) {
    throw Error('Must pass a number');
  }
  if (!_.isArray(u8LnkKey)) {
    throw Error('Must pass a byte array');
  } else if (u8LnkKey.length !== 16) {
    throw Error('Array must be of length 16');
  }

  return Packet.createCommand(Packet.COMMANDS.REGISTER_NODE, [u64IeeeAdd, u8LnkKey]);
}

/*
  GET APS KEY TABLE REQUEST
  Get APS Link table of Registered Nodes

  Parameter - Description
  u8StartIdx - Starting index into the APS Link value pair list. This is
               used to get more of the list if the list is too large for one
               message, as indicated in the response. Set to 0xff to search
               for a specific IEEE address.
  u64IeeeAdd - (optional if u8StartIdx is 0xff) IEEE address of interest.
*/
Packet.getAPSKeyOrTable = function(u8StartIdx, u64IeeeAdd) {
  if (!_.isNumber(u8StartIdx)) {
    throw Error('Must pass a number');
  }
  if (u8StartIdx === 0xFF && !_.isNumber(u64IeeeAdd)) {
    throw Error('Must pass a number for u64IeeeAdd if u8StartIdx is 0xFF');
  }

  return Packet.createCommand(Packet.COMMANDS.GET_APS_KEY_TABLE_REQUEST, [u8StartIdx, u64IeeeAdd]);
}

/*
  REQUEST NETWORK OR PARTNER KEY
  Request Network or Partner Link Key from Trust Center

  Parameter - Description
  u8KeyType - Type of key requested (1 if network key, 2 if partner APS key)
  u64IeeeAdd - The node IEEE address
*/
Packet.requestNetworkOrPartnerKey = function(u8KeyType, u64IeeeAdd) {
  if (!_.isNumber(u8KeyType)) {
    throw Error('Must pass a number');
  } else if (u8KeyType !== 1 && u8KeyType !== 2) {
    throw Error('Must be 0x01 or 0x02');
  }
  if (!_.isNumber(u64IeeeAdd)) {
    throw Error('Must pass a number');
  }

  return Packet.createCommand(Packet.COMMANDS.REQUEST_NETWORK_OR_PARTNER_KEY, [u8KeyType, u64IeeeAdd]);
}

/*
  MODIFY PERMIT JOIN REQUEST
  Modify the Permit Join Time on a Device

  Parameter - Description
  u8Mode - Indicates if DstAddr is 16 bits ShortAddress (0x00), or 64 bits IEEEAddress (0x01)
  u16DstAdd or -  Network or IEEE address of the device to be modified. Use
  u64DstAdd       0xFFFC to broadcast request to ALL routers and coordinator.
  u8Duration - The time duration for Permit Joining.
               0x00: disabled,
               0x01-0xFE: number of seconds to permit joining.
*/
Packet.modifyPermitJoinRequest = function(u8Mode, u16oru32DstAdd, u8Duration) {
  if (!_.isNumber(u8Mode)) {
    throw Error('Must pass a number');
  }
  if (!_.isNumber(u16oru32DstAdd)) {
    throw Error('Must pass a number');
  }
  if (!_.isNumber(u8Duration)) {
    throw Error('Must pass a number');
  }

  return Packet.createCommand(Packet.COMMANDS.MODIFY_PERMIT_JOIN_REQUEST, [u8Mode, u16oru32DstAdd, u8Duration]);
}

/*
  SHORT NETWORK ADDRESS REQUEST
  Request a device’s short network address and its
  Children’s (ShortAddress) list

  Parameter - Description
  u64IEEE - IEEE address of the destination device
  u8ReqType - 0x00: Single device response; 0x01: Include associated devices
  u8StartIdx - Starting index into the children list. This is used to get
               more of the list if the list is too large for one message
*/
Packet.shortNetworkAddressRequest = function(u64IEEE, u8ReqType, u8StartIdx) {
  if (!_.isNumber(u64IEEE)) {
    throw Error('Must pass a number');
  }
  if (!_.isNumber(u8ReqType)) {
    throw Error('Must pass a number');
  } else if (u8ReqType !== 0x00 || u8ReqType !== 0x01) {
    throw Error('Number must be 0x00 or 0x01');
  }
  if (!_.isNumber(u8StartIdx)) {
    throw Error('Must pass a number');
  }

  return Packet.createCommand(Packet.COMMANDS.SHORT_NETWORK_ADDRESS_REQUEST, [u64IEEE, u8ReqType, u8StartIdx]);
}

/*
  IEEE ADDRESS REQUEST
  Request a device’s Network address and its Children’s
  (ShortAddress) list

  Parameter - Description
  u16DstAdd - Short address of the destination device
  u8ReqType - 0x00: Single device response; 0x01: Include associated devices
  u8StartIdx - Starting index into the children list. This is used to get
               more of the list if the list is too large for one message
*/
Packet.ieeAddressRequest = function(u16DstAdd, u8ReqType, u8StartIdx) {
  if (!_.isNumber(u16DstAdd)) {
    throw Error('Must pass a number');
  }
  if (!_.isNumber(u8ReqType)) {
    throw Error('Must pass a number');
  } else if (u8ReqType !== 0x00 || u8ReqType !== 0x01) {
    throw Error('Number must be 0x00 or 0x01');
  }
  if (!_.isNumber(u8StartIdx)) {
    throw Error('Must pass a number');
  }

  return Packet.createCommand(Packet.COMMANDS.IEEE_ADDRESS_REQUEST, [u64IEEE, u8ReqType, u8StartIdx]);
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

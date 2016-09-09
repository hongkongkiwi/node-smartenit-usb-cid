/*
  System Commands: These deal with items local to the
  ZBCID processor such as maintenance and administration
*/

module.exoprts = function(Packet) {

  /*
    SYSTEM PING
    PING device to verify if it is active and to check its capability
  */
  Packet.systemPing = function() {
    return Packet.createCommand(Packet.COMMANDS.PING);
  }

  /*
    SYSTEM PING RESPONSE
  */
  Packet.prototype.systemPingResponse = function() {
    var u8MacFlags = this.pyld.readUInt8(0);
    var u8Services = this.pyld.readUInt8(1);
    var u8FWVersion = this.pyld.readUInt8(2);
    var u16Profile = this.pyld.readUInt16BE(3);
    var u16ShortAdd = this.pyld.readUInt16BE(5);
    var u64IeeeAdd = this.pyld.readUIntBE(7,4);

    return {
      u8MacFlags: {
        name: 'Node capability flags',
        bit0: {
          name: 'Coordinator capability',
          value: (u8MacFlags & (1 << 0)) != 0,
        },
        bit1: {
          name: 'FFD',
          value: (u8MacFlags & (1 << 1)) != 0,
        },
        bit2: {
          name: 'Node is mains powered',
          value: (u8MacFlags & (1 << 2)) != 0,
        },
        bit3: {
          name: 'Receiver is enabled during idle periods',
          value: (u8MacFlags & (1 << 3)) != 0,
        },
        bit6: {
          name: 'Capable of high security',
          value: (u8MacFlags & (1 << 6)) != 0,
        },
        bit7: {
          name: 'Network address should be allocated to node',
          value: (u8MacFlags & (1 << 7)) != 0,
        }
      },
      u8Services: {
        name: 'Available services information',
        bit0: {
          name: 'Primary Trust Center',
          value: (u8Services & (1 << 0)) != 0,
        },
        bit1: {
          name: 'Backup Trust Center',
          value: (u8Services & (1 << 1)) != 0,
        },
        bit2: {
          name: 'Primary Binding Table Cache',
          value: (u8Services & (1 << 2)) != 0,
        },
        bit3: {
          name: 'Backup Binding Table Cache',
          value: (u8Services & (1 << 3)) != 0,
        },
        bit4: {
          name: 'Primary Discovery Cache',
          value: (u8Services & (1 << 4)) != 0,
        },
        bit5: {
          name: 'Backup Discovery Cache',
          value: (u8Services & (1 << 5)) != 0,
        },
        bit6: {
          name: 'Network Manager',
          value: (u8Services & (1 << 6)) != 0,
        },
        bit7: {
          name: 'Node is in “Running” state',
          value: (u8Services & (1 << 7)) != 0,
        }
      },
      u8FWVersion: {
        name: 'Node firmware version',
        value: u8FWVersion,
      },
      u16Profile: {
        name: 'ZigBee profile in use on the first active endpoint of this node',
        value: u16Profile,
        hexStr: '0x' + decimalToHex(u16Profile,2).toUpperCase(),
      },
      u16ShortAdd: {
        name: 'The node network (short) address',
        value: u16ShortAdd,
        hexStr: '0x' + decimalToHex(u16ShortAdd,2).toUpperCase()
      },
      u64IeeeAdd: {
        name: 'The node IEEE address',
        value: u64IeeeAdd,
        hexStr: '0x' + decimalToHex(u64IeeeAdd,8).toUpperCase()
      }
    }
  }

  /*
    SYSTEM RESET REQUEST
    Reset device

    Parameter - Description
    u8Type  0x00: Requests target device soft reset
            0x01: Enter flash programming mode and reset (serial bootloader reset.)
            0x02: Clear non-volatile memory (flash) and reset.
  */
  Packet.systemResetRequest = function(u8Type) {
    if (!_.isNumber(u8Type)) {
      throw Error('Must pass a number');
    } else if (u8Type > 0x02 || u8Type < 0x00) {
      throw Error('Parameter must be 0x01, 0x02 or 0x03');
    }

    return Packet.createCommand(Packet.COMMANDS.SYSTEM_RESET_REQUEST, new Buffer(1).writeUInt8(u8Type));
  }

  /*
    SYSTEM MESSAGE ERROR RESPONSE
    The command was malformed or invalid (too many or too few bytes)
  */
  Packet.prototype.systemMessageErrorResponse = function() {
    var u8Status = this.pyld.readUInt8(0);
    var message;

    switch (u8Status) {
      case 0x80:
        message = {message: 'Malformed command (possibly too few bytes)'};
        break;
      case 0x81:
        message = {message: 'Internal buffer allocation error'};
        break;
      case 0x82:
        message = {message: 'Command was not recognized.'};
        break;
    }

    if (u8Status === 0x82) {
      message.case = this.cmd ^ 0xFF00;
      message['code [hex]'] = decimalToHex(this.cmd ^ 0xFF00,2).toUpperCase();
    }

    return message;
  }

  /*
    SYSTEM GET TIME
    Gets current system time
  */
  Packet.systemGetTime = function() {
    return Packet.createCommand(Packet.COMMANDS.SYSTEM_GET_TIME);
  }

  /*
    SYSTEM GET TIME RESPONSE
  */
  Packet.prototype.systemGetTimeResponse = function() {
    var u32Time = this.pyld.readUInt8(0);
    return {
      u32Time: {
        name: 'ZigBee UTC time',
        value: u32Time
      }
    };
  }

  /*
    SYSTEM SET TIME
    Sets current system time

    Parameter - Description
    u32Time - ZigBee UTC time
    i32TimeZone - Local time zone as an offset from UTC in seconds
    u32DstStart - Start of daylight saving time in UTC for the current year
    u32DstEnd - End of daylight saving time in UTC for the current year
    u32DstShift - Shift applied to local time during daylight saving period
  */
  Packet.systemSetTime = function(u32Time, i32TimeZone, u32DstStart, u32DstEnd, u32DstShift) {
    if (!_.isNumber(u32Time)) {
      throw Error('Must pass a number');
    }
    if (!_.isNumber(i32TimeZone)) {
      throw Error('Must pass a number');
    }
    if (!_.isNumber(u32DstStart)) {
      throw Error('Must pass a number');
    }
    if (!_.isNumber(u32DstEnd)) {
      throw Error('Must pass a number');
    }
    if (!_.isNumber(u32DstShift)) {
      throw Error('Must pass a number');
    }

    return Packet.createCommand(Packet.COMMANDS.SYSTEM_SET_TIME, [u32Time, i32TimeZone, u32DstStart, u32DstEnd, u32DstShift]);
  }

  /*
    SYSTEM SET TIME RESPONSE
  */
  Packet.prototype.systemSetTimeResponse = function() {
    var u8Status = this.pyld.readUInt8(0);
    return {
      u8Status: {
        name: 'Indicates success (0) or Failure (1)',
        value: u8Status
      }
    };
  }

  return Packet;
}

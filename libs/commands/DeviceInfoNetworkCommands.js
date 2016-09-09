/*
  Device Information and Network Commands: This
  section contains the functions necessary to start and
  maintain the ZigBee Pro network as well as the commands
  to interrogate any node for its various parameters and
  descriptors.
*/

module.exoprts = function(Packet) {
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
    var u16PanID = this.pyld.readUInt16BE(1);
    var u64ExtPanID = this.pyld.readUInt(3,8);

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
    if (!_.isNumber(u8LnkKey)) {
      throw Error('Must pass a number');
    }

    return Packet.createCommand(Packet.COMMANDS.REGISTER_NODE, [u64IeeeAdd, u8LnkKey]);
  }

  /*
    REGISTER NODE RESPONSE
  */
  Packet.prototype.registerNodeResopnse = function() {
    var u8Status = this.pyld.readUInt8(0);

    return {
      u8Status: {
        name: '0 if success, 1 if failure',
        value: u8Status,
      },
    };
  }

  /*
    GET APS KEY TABLE REQUEST
    Get APS Link table of Registered Nodes

    Parameter - Description
    u8StartIdx - Starting index into the APS Link value pair list. This is
                 used to get more of the list if the list is too large for one
                 message, as indicated in the response. Set to 0xff to search
                 for a specific IEEE address.
    u64IeeeAdd - (optional if u8StartIdx is 0xff) IEEE address of interest
  */
  Packet.getAPSKeyTableRequest = function(u8StartIdx, u64IeeeAdd) {
    if (!_.isNumber(u8StartIdx)) {
      throw Error('Must pass a number');
    }
    if (u8StartIdx === 0xFF && !_.isNumber(u64IeeeAdd)) {
      throw Error('Must pass a number when u8StartIdx is 0xFF');
    }

    var params = [u8StartIdx];

    if (!_.isUndefined(u64IeeeAdd)) {
      params[1] = u64IeeeAdd;
    }

    return Packet.createCommand(Packet.COMMANDS.GET_APS_KEY_TABLE_REQUEST, params);
  }

  /*
    GET APS KEY TABLE RESPONSE
    (Also issued when a new key is detected)

    Parameter - Description
    u8Status - 0 if success
    u8StartIdx - Starting index into the list
    u8NodesNum - Number of records in response (4 maximum)
                 sKVP[] Array of records consisting of u64IEEE address followed
                 by 16-byte APS Key
    u8Remaining - Number of entries remaining to be read
  */
  Packet.prototype.getAPSKeyTableResponse = function() {
    var u8Status = this.pyld.readUInt8(0);
    var u8StartIdx = this.pyld.readUInt8(1);
    var u8NodesNum = this.pyld.readUInt8(2);
    var u8Remaining = this.pyld.readUInt8(3);

    return {
      u8Status: {
        name: '0 if success, 1 if failure',
        value: u8Status,
      },
      u8StartIdx: {
        name: 'Starting index into the list',
        value: u8StartIdx,
      },
      u8NodesNum: {
        name: 'Number of records in response (4 maximum) sKVP[] Array of records consisting of u64IEEE address followed by 16-byte APS Key',
        value: u8NodesNum,
      },
      u8Remaining: {
        name: 'Number of entries remaining to be read',
        value: u8Remaining,
      }
    };
  }

  /*
    REQUEST NETWORK OR PARTNER KEY
    Request Network or Partner Link Key from Trust
    Center

    Parameter - Description
    u8KeyType - Type of key requested (1 if network key, 2 if partner APS key)
    u64IeeeAdd - The node IEEE address
  */
  Packet.requestNetworkOrPartnerKey = function(u8KeyType, u64IeeeAdd) {
    if (!_.isNumber(u8KeyType)) {
      throw Error('Must pass a number');
    } else if (u8KeyType !== 1 && u8KeyType !== 2) {
      throw Error('u8KeyType must be 1 or 2');
    }
    if (!_.isNumber(u64IeeeAdd)) {
      throw Error('Must pass a number');
    }

    return Packet.createCommand(Packet.COMMANDS.REQUEST_NETWORK_OR_PARTNER_KEY, [u8KeyType, u64IeeeAdd]);
  }

  /*
    REQUEST KEY RESPONSE
  */
  Packet.prototype.requestKeyResponse = function() {
    var u8Status = this.pyld.readUInt8(0);

    return {
      u8Status: {
        name: '0 if success, 1 if failure',
        value: u8Status,
      },
    };
  }

  /*
    MODIFY PERMIT JOIN REQUEST
    Modify the Permit Join Time on a Device

    Parameter - Description
    u8Mode - Indicates if DstAddr is 16 bits ShortAddress (0x00), or 64
             bits IEEEAddress (0x01)
    u16DstAdd or - Network or IEEE address of the device to be modified.
    u64DstAdd      Use 0xFFFC to broadcast request to ALL routers and
                   coordinator.
    u8Duration - The time duration for Permit Joining.
                 0x00: disabled,
                 0x01-0xFE: number of seconds to permit joining.
  */
  Packet.modifyPermitJoinRequest = function(u8Mode, u16or64DstAdd, u8Duration) {
    if (!_.isNumber(u8Mode)) {
      throw Error('Must pass a number');
    } else if (u8Mode !== 0x00 && u8Mode !== 0x01) {
      throw Error('u8Mode must be 0x00 or 0x01');
    }
    if (!_.isNumber(u16or64DstAdd)) {
      throw Error('Must pass a number');
    }
    if (!_.isNumber(u8Duration)) {
      throw Error('Must pass a number');
    }

    return Packet.createCommand(Packet.COMMANDS.MODIFY_PERMIT_JOIN_REQUEST, [u8Mode, u16or64DstAdd, u8Duration]);
  }

  /*
    MODIFY PERMIT JOIN RESPONSE

    u8PermitTime - Number of seconds that joining will be permitted
                   (0x00 – 0xFE) or 0xFF if error.
  */
  Packet.networkAddressResponse = function() {
    var u8PermitTime = this.pyld.readUInt8(0);

    return {
      u8PermitTime: {
        name: 'Number of seconds that joining will be permitted (0x00 – 0xFE) or 0xFF if error.',
        value: u8PermitTime,
      }
    };
  }

  /*
    DEVICE JOINED
    A Node has Joined the Network

    Parameter - Description
    u16DevAdd - Network address of the device generating the request
    u64DevAdd - The IEEE address of the device being announced
    u8Capabilities - Bit mask of the operating capabilities of the device:
                     Bit 0 - 1: Node able to act as Coordinator
                     Bit 1 - 1: Full function device FFD,
                             0: Reduced-function device (RFD)
                     Bit 2 - 1: Node is mains powered
                     Bit 3 - 1: Receiver is enabled during idle periods
                     Bit 6:     Node is capable of high security
                     Bit 7 – 1: Network address should be allocated to node
  */
  Packet.deviceJoined = function() {
    var u16DevAdd = this.pyld.readUInt16BE(0);
    var u64DevAdd = this.pyld.readUInt(2,8);
    var u8Capabilities = this.pyld.readUInt8(10);

    return {
      u16DevAdd: {
        name: 'Network address of the device generating the request',
        value: u16DevAdd,
      },
      u64DevAdd: {
        name: 'The IEEE address of the device being announced',
        value: u64DevAdd,
      },
      u8Capabilities: {
        name: 'Bit mask of the operating capabilities of the device:',
        bit0: {
          name: 'Node able to act as Coordinator',
          value: (u8Capabilities & (1 << 0)) != 0,
        },
        bit1: {
          name: '1: Full function device FFD, 0: Reduced-function device (RFD)',
          value: (u8Capabilities & (1 << 1)) != 0,
        },
        bit2: {
          name: 'Node is mains powered',
          value: (u8Capabilities & (1 << 2)) != 0,
        },
        bit3: {
          name: 'Receiver is enabled during idle periods',
          value: (u8Capabilities & (1 << 3)) != 0,
        },
        bit6: {
          name: 'Node is capable of high security',
          value: (u8Capabilities & (1 << 6)) != 0,
        },
        bit7: {
          name: 'Network address should be allocated to node',
          value: (u8Capabilities & (1 << 7)) != 0,
        }
      },
    };
  }

  /*
    SHORT NETWORK ADDRESS REQUEST
    Request a device’s short network address and its Children’s (ShortAddress) list

    Parameter - Description
    u64IEEE - IEEE address of the destination device
    u8ReqType - 0x00: Single device response;
                0x01: Include associated devices
    u8StartIdx - Starting index into the children list. This is used to get
                 more of the list if the list is too large for one message
  */
  Packet.shortNetworkAddressRequest = function(u64IEEE, u8ReqType, u8StartIdx) {
    if (!_.isNumber(u64IEEE)) {
      throw Error('Must pass a number');
    }
    if (!_.isNumber(u8ReqType)) {
      throw Error('Must pass a number');
    } else if (u8ReqType !== 0x00 && u8ReqType !== 0x01) {
      throw Error('u8ReqType must be 0x00 or 0x01');
    }
    if (!_.isNumber(u8StartIdx)) {
      throw Error('Must pass a number');
    }

    return Packet.createCommand(Packet.COMMANDS.SHORT_NETWORK_ADDRESS_REQUEST, [u64IEEE, u8ReqType, u8StartIdx]);
  }

  /*
    IEEE ADDRESS REQUEST
    Request a device’s Network address and its Children’s (ShortAddress) list

    Parameter - Description
    u16DstAdd - Short address of the destination device
    u8ReqType - 0x00: Single device response;
                0x01: Include associated devices
    u8StartIdx - Starting index into the children list. This is used to get
                 more of the list if the list is too large for one message
  */
  Packet.ieeeAddressRequest = function(u16DstAdd, u8ReqType, u8StartIdx) {
    if (!_.isNumber(u16DstAdd)) {
      throw Error('Must pass a number');
    }
    if (!_.isNumber(u8ReqType)) {
      throw Error('Must pass a number');
    } else if (u8ReqType !== 0x00 && u8ReqType !== 0x01) {
      throw Error('u8ReqType must be 0x00 or 0x01');
    }
    if (!_.isNumber(u8StartIdx)) {
      throw Error('Must pass a number');
    }

    return Packet.createCommand(Packet.COMMANDS.IEEE_ADDRESS_REQUEST, [u8Mode, u16or64DstAdd, u8Duration]);
  }

  /*
    NETWORK ADDRESS RESPONSE
    Response to IEEE or Short Address Request

    Parameter - Description
    u8Status - Indicates success (0) or Failure (1)
    u64IEEE - IEEE address of the source device
    u16NwkAdd - Short network address of responding device
    u8AssocDevs - Number of associated devices
    u8StartIdx - Starting index into the children list. This is used to get
                 more of the list if the list is too large for one message
    u16Assoc[] - Array of network addresses for associated devices
  */
  Packet.networkAddressResponse = function() {
    var u8Status = this.pyld.readUInt8(0);
    var u64IEEE = this.pyld.readUInt(1,8);
    var u16NwkAdd = this.pyld.readUInt16BE(9);
    var u8AssocDevs = this.pyld.readUInt8(11);
    var u8StartIdx = this.pyld.readUInt8(12);
    var u16Assoc = this.pyld.readUInt16BE(13);

    return {
      u8Status: {
        name: 'Indicates success (0) or Failure (1)',
        value: u8Status,
      },
      u64IEEE: {
        name: 'IEEE address of the source device',
        value: u64IEEE,
      },
      u16NwkAdd: {
        name: 'Short network address of responding device',
        value: u16NwkAdd,
      },
      u8AssocDevs: {
        name: 'Number of associated devices',
        value: u8AssocDevs,
      },
      u8StartIdx: {
        name: 'Starting index into the children list. This is used to get more of the list if the list is too large for one message',
        value: u8StartIdx,
      },
      u16Assoc: {
        name: 'Array of network addresses for associated devices',
        value: u16Assoc,
      },
    };
  }

  /*
    NODE DESCRIPTOR REQUEST
    Get theDestination’s Device Node Descriptor.

    Parameter - Description
    u16DstAdd - Network address of the device generating the inquiry
    u16Interest - Network address of the destination device being queried
  */

  /*
    NODE DESCRIPTOR RESPONSE

    Parameter - Description
    u8Status - Success (0), Failure (non-zero NV error code)
    u16SrcAddr - The message’s source network address
    u16NodeDsc - (2:0) NodeType:
                  Coordinator = 0,
                  Router = 1,
                  End Device = 2,
                  Reserved = 3-7
                 (3) CDAvail: Indicates if complex descriptor is available for the node
                 (4) UD Avail: Indicates if User Descriptor is available
                 (10:8) APSFlags: Node Flags assigned for APS.
                 (15:11) FreqBand: Identifies node frequency band capabilities
    u8MacFlags - MAC Capability flags
    u16MfrCode - Specifies a manufacturer code that is allocated by the
                 ZigBee Alliance, relating to the manufacturer of the device
    u8BfrSize - Indicates size of maximum NPDU. This field is used as a
                high level indication for management
    u16MaxRx - Indicates maximum size of Transfer up to 0x7fff
    u16SrvrMask - Specifies the system server capability. It is defined as follows:
                  Bit Number Assignment
                  0 Primary Trust Center
                  1 Backup Trust Center
                  2 Primary Binding Table Cache
                  3 Backup Binding table Cache
                  4 Primary Discovery Cache
                  5 Backup Discovery Cache
                  6-15 Reserved
    u16MaxTx - Indicates maximum size of the ASDU
    u8Capability - Properties of the node that can be used by other nodes in network discovery
  */

  /*
    SIMPLE DESCRIPTOR REQUEST
    Get the Destination’s Device Simple Descriptor
    Information

    Parameter - Description
    u16DstAdd - Network address of the device generating the inquiry
    u16Interest - Network address of the destination device being queried
    u8EndPoint - The application endpoint that sources the data
  */

  /*
    SIMPLE DESCRIPTOR RESPONSE

    Parameter - Description
    u8Status - Success (0x00), Failure (0x01)
    u16Interest - Network address of the destination queried
    u8Length - Length of the returned simple descriptor
    u8EndPoint - The application endpoint that sources the data
    u16ProfileID - Endpoint profile ID
    u16DeviceID - Endpoint Device ID
    u8EPFlags - (3:0) Version of device description supported
    u8InClstrs - Number of Cluster IDs in the Input Clusters List
    u16InClstrs[] - Array of Input Clusters IDs
    u8OutClstrs - Number of Cluster IDs in the Output Clusters List
    u16OtClstrs[] - Array of Output Clusters IDs
  */

  /*
    ACTIVE ENDPOINT REQUEST
    Get the Destination’s Device Active Endpoint
    Information

    Parameter - Description
    u16DstAdd - Network address of the device generating the request
    u16Interest - Network address of the destination device being queried
  */

  /*
    ACTIVE ENDPOINT RESPONSE
    Get the Destination’s Device Active Endpoint
    Information

    Parameter - Description
    u8Status - Success (0x00), Failure (0x01)
    u16Interest - Network address of the destination queried
    u8EndPnts - Number of Endpoints in the list
    u8EPLst[] - Byte array of Endpoints in the queried device
  */

  /*
    USER DESCRIPTOR REQUEST
    Get the Destination’s Device User Descriptor
    Information

    Parameter - Description
    u16SrcAdd Network address of the device generating the inquiry
    u16DstAdd Network address of the destination device being queried
  */

  /*
    USER DESCRIPTOR RESPONSE

    Parameter - Description
    u8Status - Success (0x00), Failure (0x01)
    u16Interest - Network address of the destination queried
    u8DescLen - Length of descriptor in bytes
    u8Desc[] - User descriptor array (up to 16 bytes)
  */

  /*
    USER DESCRIPTOR SET REQUEST
    Set Destination Device’s User Descriptor Information

    Parameter - Description
    u16SrcAdd - The message’s source network address
    u16Interest - Network address of the described device
    u8DescLen - Length, in bytes, of the user descriptor
    u8Desc[] - User descriptor array (can be up to 16 bytes)
  */

  /*
    USER DESCRIPTOR SET RESPONSE

    Parameter - Description
    u8Status - Success (0x00), Failure (0x01)
    u16SrcAddr - The message’s source network address
  */

  /*
    MATCH DESCRIPTOR REQUEST
    Request responses from nodes matching specified
    criteria in their simple descriptors

    Parameter - Description
    u16DstAdd - Network address of the device generating the request
    u16Interest - Network address of the device of interest
    u16Profile - Profile ID
    u8InClusters - Number of input clusters
    u8OutClusters - Number of output clusters
    u16InClstrs[] - List of input clusters
    u16OtClstrs[] - List of output clusters
  */

  /*
    MATCH DESCRIPTOR RESPONSE

    Parameter - Description
    u8Status - Success (0x00), Failure (0x01)
    u16SrcAddr - The message’s source network address
    u8MatchLen - Length of the list of matched endpoints
    u8Matched[] - List of matched endpoints
  */

  /*
    NETWORK LEAVE REQUEST

    Parameter - Description
    u64DevAdd - The IEEE address of the device requested to leave
    u8Options - 0 – Children not to leave. Do not rejoin the network.
                1 – Children not to leave. Rejoin the network immediately
                2 – Children to leave. Do not rejoin the network.
                3 – Children to leave. Rejoin the network immediately.
  */

  /*
    NETWORK LEAVE REQUEST CONFIRM
    Leave request response

    Parameter - Description
    u64DevAdd - The IEEE address of the device being asked to leave
    u8Status - Status indicator of the request: 0x00 if successful
  */

  /*
    END DEVICE ANNOUNCE
    A new node announced joining or rejoining the network

    Parameter - Description
    u16DevAdd - Network address of the device generating the request
    u64DevAdd - The IEEE address of the device being announced
    u8Capabilities - Bit mask of the operating capabilities of the device:
                      Bit 0 – 1: Node able to act as coordinator
                      Bit 1 – 1: Full function device; 0: Reduced function device
                      Bit 2 – 1: Node is mains powered
                      Bit 3 – 1: Rx enabled during idle periods
                      Bit 6 – 1: High security enabled; 0: Standard security
                      Bit 7 – 1: Network address should be allocated to the node
  */

  /*
    DEVICE LEAVE ANNOUNCE
    A node has announced leaving the network

    Parameter - Description
    u64DevAdd - The IEEE address of the device leaving the network
    u8Rejoin - Indicates whether the leaving node was requested to
               attempt a rejoin. 0x00 if not, non-zero if yes.
  */

  /*
    POWER DESCRIPTOR REQUEST
    Get Power Descriptor Information

    Parameter - Description
    u16SrcAdd - The message’s source network address
    u16Interest - Network address of the device of interest
  */

  /*
    POWER DESCRIPTOR RESPONSE

    Parameter - Description
    u8Status - Success (0x00), Failure (0x01)
    u32PwrDesc - The power descriptor bits as follows:
  */

  /*
    ACTIVE NETWORK TABLE REQUEST
    Get Active Network Table From a Node

    Parameter - Description
    u16SrcAdd - The message’s source network address
    u16Interest - Network address of the device of interest
    u8StartIdx - Starting index in the array list. Since the result may contain
                 more entries than can be reported, this field allows retrieval
                 of entries from anywhere in the array list.
  */

  /*
    ACTIVE NETWORK TABLE RESPONSE

    Parameter - Description
    u8Status - Success (0x00), Failure (0x01)
    u16SrcAddr - The message’s source network address
    u8NetTabSize - Network table total number of entries
    u8StartIdx - Wherein the total number of entries this response starts
    u8NetTabCnt - Number of entries in this response
    sNetTab[] - Array of network table entries. Each entry has the following:
                  u64PanID – 64-bit extended PAN ID of neighbor
                  u64IEEEAddr – Node IEEE address
                  u16ShortAddr – Node short address
                  u16Flags – Bit array containing information as follows:
                    bits 0:1 – Device type (ZC if 0, ZR if 1, ZED if 2)
                    bits 2:3 – Rx On when idle (Off if 0, On if 1)
                    bits 4:6 – Relationship (Neighbor is the parent if
                               0, Neighbor is a child if 1, Neighbor is
                               a sibling if 2, None of the above if 3,
                               Unknown if 4)
                    bit 7 – Reserved
                    bits 8:9 – Permit joining (not accepting requests if
                               0, accepting requests if 1)
                  u8Depth – depth of the node relative to the coordinator
                  u8LinkQuality – Relative measure of signal strength
  */

  /*
    ROUTING TABLE REQUEST
    Get Routing Table From a Node

    Parameter - Description
    u16SrcAdd - The message’s source network address
    u16Interest - Network address of the device of interest
    u8StartIdx - Starting index in the array list. Since the result may contain
                 more entries than can be reported, this field allows retrieval
                 of entries from anywhere in the array list.
  */

  /*
    ROUTING TABLE RESPONSE

    Parameter - Description
    u8Status - Success (0x00), Failure (0x01)
    u16SrcAddr - The message’s source network address
    u8TabSize - Routing table total number of entries
    u8StartIdx - Starting point where this response starts
    u8NetTabCnt - Number of entries in this response
    sRtngTab[] - Array of network table entries. Each entry has the following:
                  u16NwkDstAddr – Destination network address
                  u16NwkNxtHopAddr – Next hop network address
                  u8Flags – Bit array containing information as follows:
                    bits 0:2 – Status of the route:
                      000=ACTIVE,
                      001=DISCOVERY_UNDERWAY,
                      010=DISCOVERY_FAILED,
                      011=INACTIVE,
                      100=VALIDATION_UNDERWAY
                    bit 3 – If 1 indicates device is concentrator
                    bit 4 – If 1indicates destination device is
                    concentrator
                    bit 5:7 – Reserved
  */

  return Packet;
}

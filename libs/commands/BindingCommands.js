/*
  Binding Commands: This section includes the functions
  necessary to bind endpoints of devices in a client/server
  relationship.
*/

module.exoprts = function(Packet) {
  /*
    BIND REQUEST
    Send Bind Request to a Node Hosting a Binding Table

    Parameter - Description
    u8AddMode - 0x01: uAddress is 16 bits address.
                0x03: uAddress is 64 bits IEEE Address.
    uAddress - Short or IEEE address of destination node of request. This
               may or may not be the node holding the binding table.
    u64SrcAddr - IEEE address of the source node for the binding (client)
    u8SrcEPt - Binding source endpoint
    u16ClstrID - Cluster ID to match
    u8DstAddMode - 0x01: DstAddress is 16 bits group address and the
                         destination endpoint is omitted.
                   0x03: DstAddr is 64 bits IEEEAddress and the destination
                         endpoint is included.
    u16DstAdd or - Address of destination node of
    u64DstAdd      the bind request (server).
    u8DstEPt - Binding Destination endpoint

    Notes:
    For binding on the local node (set binding in local node binding table), set
    u8AddMode to 0x01, and uAddress to the destination address of the
    binding. Then set u64SrcAddr to the long address of the local node. Lastly,
    only u8DstAddMode 0x03 is supported, so use u64DstAdd and u8DstEPt.
    Example - Bind an OnOff client cluster on a device endpoint 1 to the
    coordinator endpoint 1:
    0200201801<u16AddressOfDevice><u64IeeeOfdevice>01000603<u64Ieee
    OfCoordinator>01FF
  */

  /*
    BIND RESPONSE

    Parameter - Description
    u8Status - Status of Bind Request:
                0x00: Success
                0x01: Not Supported
                0x02: Table Full
                0x03-0xFF: Reserved
    u16SrcAddr - The message’s source network address
  */

  /*
    UNBIND REQUEST
    Send Unbind Request to a Node Hosting a Binding Table

    Parameter - Description
    u8AddMode - 0x01: uAddress is 16 bits address.
                0x03: uAddress is 64 bits IEEE Address.
    uAddress - Short or IEEE address of destination node of request. This
               may or may not be the node holding the binding table.
    u64SrcAddr - IEEE address of the source node for the binding (client)
    u8SrcEPt - Binding source endpoint
    u16ClstrID - Cluster ID to match
    u8DstAddMode - 0x01: DstAddress is 16 bits group address and the
                         destination endpoint is omitted.
                   0x03: DstAddr is 64 bits IEEEAddress and the destination
                         endpoint is included.
    u16DstAdd or - Address of destination node of
    u64DstAdd      the bind request (server).
    u8DstEPt - Binding Destination endpoint

    Notes:
    Example - Unbind an OnOff client cluster on a device endpoint 1 to the
    coordinator endpoint 1:
    0200201801<u16AddressOfDevice><u64IeeeOfdevice>01000603<u64Ieee
    OfCoordinator>01FF
  */

  /*
    UNBIND RESPONSE

    Parameter - Description
    u8Status - Status of Bind Request:
                0x00: Success
                0x01: Not Supported
                0x02: Table Full
                0x03-0xFF: Reserved
    u16SrcAddr - The message’s source network address
  */

  /*
    END DEVICE BIND RESPONSE

    Parameter - Description
    u8Status - Status of Bind Request:
                0x00: Success
                0x01: Not Supported
                0x02: Table Full
                0x03-0xFF: Reserved
    u16SrcAddr - The message’s source network address
  */

  /*
    BIND TABLE REQUEST
    Request the binding table of a device

    Parameter - Description
    u16DstAdd - Network address of the device generating the request
    u16Interest - Network address of the device of interest
    u8StartIdx - Starting index in the array list. Since the result may contain
                 more entries than can be reported, this field allows retrieval
                 of entries from anywhere in the array list.
  */

  /*
    BIND TABLE RESPONSE

    u8Status - 0x00: Success,
               Non-zero: Failure
    u16SrcAddr - The message’s source network address
    u16BindCnt - Total number of entries available in the device
    u16StartIdx - Wherein the total number of entries this response starts
    u16BndLstCnt - Number of entries in this response
    sBindList[] - An array of BindList items formatted as follows:
                  <u64SourceAddress><u8SourceEndpoint><u16ClusterID>
                  <u8DstAddrMode> Plus:
                    a) If u8DstAddrMode == 3:
                    <u64DstAddress><u8DstEndpoint>
                    b) Else: <u16DstAddress>
  */

  return Packet;
}

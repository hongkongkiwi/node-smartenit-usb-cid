/*
  Cluster Commands: ZigBee endpoints in devices contain
  clusters which are in turn collections of the attributes and
  commands that determine the device’s behavior. This
  section of the API includes the commands for sending and
  receiving messages to/from these clusters. The API
  supports a generalized command frame that can be used to
  send cluster specific commands, as well as commands that
  apply across the entire profile (general.)
*/

  /*
    ZDP COMMAND NEGATIVE RESPONSE
    ZDP Request not sent error message

    Parameter - Description
    u16SrcAddr - The message’s source network address
    u16Interest - Network address of the device of interest
    u8Status - Non-Zero: Failure code (refer to Jennic’s ZBP stack document)
  */

  /*
    CLUSTER COMMANDS
    General format for sending commands to a cluster

    u8Mode - Bits 0:1 - Indicate if DstAddr is 16 bits ShortAddress
              (0x02), or 16 bits GroupAddress (0x01)
             Bit 3 – If set, force APS security
             Bit 4 – If set, disable default response
             Bit 5 – If set, direction is from server to client
             Bit 6 – If set, message is manufacturer specific. The
                     manufacturer code is the first 16-bit field in
                    the payload array.
            Bit 7 – If set, command applies across entire profile.
    u16MfrCode - Manufacturer Code (if bit 6 is set in u8Mode)
    u16DstAdd - Network address of the device being addressed
    u8DstEP - Destination endpoint
    u16ClstrID - Cluster ID being addressed
    u8CmdID - Command identifier
    <Variable> - Parameters (payload) specific to a command (or none)

    NOTE: If the cluster/command combination is not found in the internal table
    of supported commands, any payload is sent unformatted. In this case, the
    application must put any included parameters in network notation (little
    endian)
  */

  

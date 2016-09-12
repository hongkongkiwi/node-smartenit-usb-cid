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

    Parameter - Description
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

  /*
    DEFAULT RESPONSE
    Default Cluster Response Message

    Parameter - Description
    u8Mode - Bits 0:1 - Indicate if DstAddr is 16 bits ShortAddress
                        (0x02), or 16 bits GroupAddress (0x01)
             Bit 4 – If set, disable default response
             Bit 5 – If set, direction is from server to client
             Bit 6 – If set, message is manufacturer specific.
             Bit 7 – If set, command applies across entire profile.
    u16MfrCode - If bit 6 of u8Mode is set, 16-bit Manufacturer Code as
                 received in the response packet
    u16SrcAdd - Network address of the source (responding) device
    u8SrcEP - Source endpoint
    u16ClstrID - Cluster ID
    u8CmdID - 0x0B – Default response command identifier
    u8RspID - Command identifier of response
    u8Status - Response status code
  */

  /*
    CLUSTER COMMAND NOT SENT RESPONSE
    API Failed to Send Command Response Message

    Parameter - Description
    u8Mode - Bits 0:1 - Indicate if DstAddr is 16 bits ShortAddress
                       (0x02), or 16 bits GroupAddress (0x01)
             Bit 4 – If set, disable default response
             Bit 5 – If set, direction is from server to client
             Bit 6 – If set, message is manufacturer specific.
             Bit 7 – If set, command applies across entire profile.
    u16MfrCode - If bit 6 of u8Mode is set, 16-bit Manufacturer Code as
                 received in the response packet
    u16SrcAdd - Network address of the source (responding) device
    u8SrcEP - Source endpoint
    u16ClstrID - Cluster ID
    u8CmdID - Command identifier of response
    u8Status - Response status codes:
               0x0A: Unsupported cluster command
               0x14: Insufficient space (buffer allocation error)
               0x2F: Software failure (unable to send message)
  */

  /*
    General - READ ATTRIBUTES
    Read one or more Attribute Values from a Cluster

    Parameter - Description
    u8Mode - 0x92 Normally.
             Bits 0:1 - Indicate if DstAddr is 16 bits ShortAddress
                        (0x02), or 16 bits GroupAddress (0x01)
              Bit 4 – If set, disable default response
              Bit 5 – If set, direction is from server to client
              Bit 6 – If set, message is manufacturer specific.
    u16MfrCode - Manufacturer Code (if bit 6 is set in u8Mode)
    u16DstAdd - Network address of the device being addressed
    u8DstEP - Destination endpoint
    u16ClstrID - Cluster ID being addressed
    u8CmdID - Command code: 0x00
    u8Attribs - Number of attributes in the list
    u16AttrLst[] - Attribute list containing the attributes to be read
  */

  /*
    READ ATTRIBUTES RESPONSE
    Default Cluster Response Message

    Parameter - Description
    u8Mode - 0x92 Normally.
              Bits 0:1 - Indicate if DstAddr is 16 bits ShortAddress
                        (0x02), or 16 bits GroupAddress (0x01)
              Bit 4 – If set, disable default response
              Bit 5 – If set, direction is from server to client
              Bit 6 – If set, message is manufacturer specific.
    u16MfrCode - Manufacturer Code as received in the packet
                 (if bit 6 is set in u8Mode)
    u16SrcAdd - Network address of the source (responding) device
    u8SrcEP - Source endpoint
    u16ClstrID - Source Cluster ID
    u8CmdID 0 0x01 – Read Attributes response command identifier
    u8Attributes - Number of Attributes in the list
    AttribRec[] - Array (list) of attribute records. Each record consists of:
                  u16AttribID – Attribute identifier
                  u8Status – Attribute read status (SUCCESS or UNSUPPORTED)
                  u8DataType – Type of the attribute
                  AttribData – Attribute data (variable depending on type)
  */

  /*
    General - WRITE ATTRIBUTES
    Write Attribute Values to a Cluster

    Parameter - Description
    u8Mode - 0x92 Normally.
              Bits 0:1 - Indicate if DstAddr is 16 bits ShortAddress
                        (0x02), or 16 bits GroupAddress (0x01)
              Bit 4 – If set, disable default response
              Bit 5 – If set, direction is from server to client
              Bit 6 – If set, message is manufacturer specific.
    u16MfrCode - Manufacturer Code (if bit 6 is set in u8Mode)
    u16DstAdd - Network address of the device being addressed
    u8DstEP - Destination endpoint
    u16ClstrID - Cluster ID being addressed
    u8CmdID - Command code: 0x02
    u8Attribs - Number of attributes in the list
    u16AttrLst[] - Attribute list containing the attribute records to be written.
                    Each record consists of:
                    u16AttribID – Attribute identifier
                    u8Type – Attribute data type
                    AttribData – Attribute data (variable depending on type)
  */

  /*
    General - WRITE ATTRIBUTE UNDIVIDED
    Write Attribute Values to a Cluster

    Parameter - Description
    u8Mode - 0x92 Normally.
              Bits 0:1 - Indicate if DstAddr is 16 bits ShortAddress
                         (0x02), or 16 bits GroupAddress (0x01)
              Bit 4 – If set, disable default response
              Bit 5 – If set, direction is from server to client
              Bit 6 – If set, message is manufacturer specific.
    u16MfrCode - Manufacturer Code (if bit 6 is set in u8Mode)
    u16DstAdd - Network address of the device being addressed
    u8DstEP - Destination endpoint
    u16ClstrID - Cluster ID being addressed
    u8CmdID - Command code: 0x03
    u8Attribs - Number of attributes in the list
    u16AttrLst[] - Attribute list containing the attribute records to be written.
                  Each record consists of:
                  u16AttribID – Attribute identifier
                  u8Type – Attribute data type
                  AttribData – Attribute data (variable depending on type)
  */

  /*
    WRITE ATTRIBUTES RESPONSE
    Write Attributes Response Message

    Parameter - Description
    u8Mode - 0x92 Normally.
              Bits 0:1 - Indicate if DstAddr is 16 bits ShortAddress
                         (0x02), or 16 bits GroupAddress (0x01)
              Bit 4 – If set, disable default response
              Bit 5 – If set, direction is from server to client
              Bit 6 – If set, message is manufacturer specific.
    u16MfrCode - If bit 6 of u8Mode is set, 16-bit Manufacturer Code as
                 received in the response packet
    u16SrcAdd - Network address of the source (responding) device
    u8SrcEP - Source endpoint
    u16ClstrID - Cluster ID
    u8CmdID - 0x04 – Write Attributes response command identifier
    u8Attributes - Number of Attributes in the list
    AttribRec[] - Array (list) of attribute records. Each record consists of:
                u8Status – Attribute read status (SUCCESS or UNSUPPORTED)
                u16AttribID – Attribute identifier
  */

  /*
    General - WRITE ATTRIBUTE NO RESPONSE
    Write Attribute Values from a Cluster

    Parameter - Description
    u8Mode - 0x92 Normally.
              Bits 0:1 - Indicate if DstAddr is 16 bits ShortAddress
                         (0x02), or 16 bits GroupAddress (0x01)
              Bit 4 – If set, disable default response
              Bit 5 – If set, direction is from server to client
              Bit 6 – If set, message is manufacturer specific.
    u16MfrCode - Manufacturer Code (if bit 6 is set in u8Mode)
    u16DstAdd - Network address of the device being addressed
    u8DstEP - Destination endpoint
    u16ClstrID - Cluster ID being addressed
    u8CmdID - Command code: 0x05
    u8Attribs - Number of attributes in the list
    u16AttrLst[] - Attribute list containing the attribute records to be written.
                    Each record consists of:
                    u16AttribID – Attribute identifier
                    u8Type – Attribute data type
                    AttribData – Attribute data (variable depending on type)
  */

  /*
    General - CONFIGURE REPORTING
    Configure Reporting Mechanism for Cluster Attributes

    Parameter - Description
    u8Mode - 0x92 Normally.
              Bits 0:1 - Indicate if DstAddr is 16 bits ShortAddress
                         (0x02), or 16 bits GroupAddress (0x01)
              Bit 4 – If set, disable default response
              Bit 5 – If set, direction is from server to client
              Bit 6 – If set, message is manufacturer specific. The
                      manufacturer code is the first 16-bit field in
                      the payload array.
    u16MfrCode - Manufacturer Code (if bit 6 is set in u8Mode)
    u16DstAdd - Network address of the device being addressed
    u8DstEP - Destination endpoint
    u16ClstrID - Cluster ID being addressed
    u8CmdID - Command code: 0x06
    u8AttribRecs - Number of attribute reporting configuration records
    aAttrRptRec[] - List of attribute configuration records. Each record
                    contains fields as specified below:
                    u8Dir – Indicates if values of the attribute are to be
                            reported (0x00) or to be received (0x01)
                            If 0x00, the minimum and maximum reporting interval
                            fields are included in the payload, and the timeout period
                            field is omitted. The record is sent to a cluster server (or
                            client) to configure how it sends reports to a client (or
                            server) of the same cluster.
                            If 0x01, the timeout period field is included in the
                            payload, and the minimum and maximum reporting
                            interval fields are omitted. The record is sent to a cluster
                            client (or server) to configure how it should expect
                            reports form a server (or client) of the same cluster.
                    u16AttribID – Attribute identifier
                    u8AttribTyp – Attribute data type
                    u16MinItvl - Minimum interval, in seconds, between
                                 issuing reports of the specified attribute.
                                 If this value is set to 0x0000, then there is no minimum
                                 limit, unless one is imposed by the specification of the
                                 cluster using this reporting mechanism or by the applicable
                                 profile.
                    u16MaxItvl - Maximum interval, in seconds, between
                                 issuing reports of the specified attribute.
                                 If this value is set to 0xffff, then the device shall not issue
                                 reports for the specified attribute, and the configuration
                                 information for that attribute need not be maintained.
                    sRepChg - Minimum change to the attribute that will result
                              in a report being issued.
                              The type of this field is the same as that of the attribute.
                              This field may be omitted for “discrete” data types such as
                              Boolean and general data but must be included.
                    u16Timeout - Maximum expected time, in seconds,
                              between received reports for the specified attribute.
                              If more time than this elapses between reports, this may be
                              an indication that there is a problem with reporting.
                              If this value is set to 0x0000, reports of the attribute are not
                              subject to timeout.
  */

  /*
    CONFIGURE REPORTING RESPONSE

    Parameter - Description
    u8Mode - 0x92 Normally.
            Bits 0:1 - Indicate if DstAddr is 16 bits ShortAddress
                       (0x02), or 16 bits GroupAddress (0x01)
            Bit 4 – If set, disable default response
            Bit 5 – If set, direction is from server to client
            Bit 6 – If set, message is manufacturer specific. The
                    manufacturer code is the first 16-bit field
                    in the payload array.
    u16MfrCode - If bit 6 of u8Mode is set, 16-bit Manufacturer Code as
                 received in the response packet
    u16SrcAdd - Network address of the source (responding) device
    u8SrcEP - Source endpoint
    u16ClstrID - Cluster ID
    u8CmdID - 0x07 – Configure Reporting response command identifier
    u8AttribRecs - Number of attribute status records
    AttribStRec[] - Array (list) of attribute status records.
                    Each record consists of:
                      u8Status – Attribute read status (SUCCESS or UNSUPPORTED)
                      u8Direction – 0x00 if value of the attribute is reported,
                                    or 0x01 if received
                      u16AttribID – Attribute identifier
  */

  /*
    General - READ REPORTING CONFIGURATION
    Read Reporting Configuration for Cluster Attributes

    Parameter - Description
    u8Mode - 0x92 Normally.
              Bits 0:1 - Indicate if DstAddr is 16 bits ShortAddress
              (0x02), or 16 bits GroupAddress (0x01)
              Bit 4 – If set, disable default response
              Bit 5 – If set, direction is from server to client
              Bit 6 – If set, message is manufacturer specific.
    u16MfrCode - Manufacturer Code (if bit 6 is set in u8Mode)
    u16DstAdd - Network address of the device being addressed
    u8DstEP - Destination endpoint
    u16ClstrID - Cluster ID being addressed
    u8CmdID - Command code: 0x08
    u8AttribRecs - Number of attribute records
    sAttrRecs[] - List of attribute records. Each record has
                  the following fields:
                  u8Direction – 0x00 if value of the attribute is reported,
                  or 0x01 if received
                  u16AttribID – Attribute identifier
  */

  /*
    READ REPORTING CONFIGURATION RESPONSE

    Parameter - Description
    u8Mode - 0x92 Normally.
              Bits 0:1 - Indicate if DstAddr is 16 bits ShortAddress
                         (0x02), or 16 bits GroupAddress (0x01)
              Bit 4 – If set, disable default response
              Bit 5 – If set, direction is from server to client
              Bit 6 – If set, message is manufacturer specific.
    u16MfrCode - If bit 6 of u8Mode is set, 16-bit Manufacturer Code as
                 received in the response packet
    u16SrcAdd - Network address of the source (responding) device
    u8SrcEP - Source endpoint
    u16ClstrID - Cluster ID
    u8CmdID - 0x09 – Configure Reporting response command identifier
    u8AttribRecs - Number of Attributes Reporting Configuration reports
    AttribReRec[] - List of attribute reporting records. Each record consists of:
                    u8Status – Attribute read status (SUCCESS, UNSUPPORTED or UNREPORTABLE)
                    u8Direction – 0x00 if value of the attribute is reported,
                                  or 0x01 if received
                    u16AttribID – Attribute identifier
                    u8Type – Attribute data type
                    u16MinRepIntvl – Minimum reporting interval in seconds
                    u16MaxRepIntvl – Maximum reporting interval in seconds
                    uRepChange – Reportable change. Omitted for ‘discrete’ data types.
                    u16Timeout – Timeout period
  */

  /*
    REPORT ATTRIBUTES MESSAGE
    Attribute Report Message from device bound a priori

    Parameter - Description
    u8Mode - 0x92 Normally.
              Bits 0:1 - Indicate if DstAddr is 16 bits ShortAddress
                         (0x02), or 16 bits GroupAddress (0x01)
              Bit 4 – If set, disable default response
              Bit 5 – If set, direction is from server to client
              Bit 6 – If set, message is manufacturer specific.
    u16MfrCode - If bit 6 of u8Mode is set, 16-bit Manufacturer Code
                 as received in the response packet
    u16SrcAdd - Network address of the source (responding) device
    u8SrcEP - Source endpoint
    u16ClstrID - Cluster ID
    u8CmdID - 0x0A – Report Attributes command identifier
    u8AttribRecs - Number of Attribute records
    AttribRec[] - Array (list) of attribute records. Each record consists of:
                  u16AttribID – Attribute identifier
                  u8DataType – Type of the attribute
                  AttribData – Attribute data (variable depending on type)
  */

  /*
    General - DISCOVER ATTRIBUTES
    Discover Attribute Values from a Cluster

    Parameter - Description
    u8Mode - 0x92 Normally.
              Bits 0:1 - Indicate if DstAddr is 16 bits ShortAddress
                         (0x02), or 16 bits GroupAddress (0x01)
              Bit 4 – If set, disable default response
              Bit 5 – If set, direction is from server to client
              Bit 6 – If set, message is manufacturer specific..
    u16MfrCode - Manufacturer Code (if bit 6 is set in u8Mode)
    u16DstAdd - Network address of the device being addressed
    u8DstEP - Destination endpoint
    u16ClstrID - Cluster ID being addressed
    u8CmdID - Command code: 0x0C
    u16StartAttr - Specifies the value of the identifier at which to
                   begin the attribute discovery
    u8MaxAttr - Specifies the maximum number of attribute identifiers that
                are to be returned in the resulting discover attributes
                response command
  */

  /*
    DISCOVER ATTRIBUTES RESPONSE
    Discover Attribute Values from a Cluster

    Parameter - Description
    u8Mode - 0x92 Normally.
              Bits 0:1 - Indicate if DstAddr is 16 bits ShortAddress
                         (0x02), or 16 bits GroupAddress (0x01)
              Bit 4 – If set, disable default response
              Bit 5 – If set, direction is from server to client
              Bit 6 – If set, message is manufacturer specific.
    u16MfrCode - If bit 6 of u8Mode is set, 16-bit Manufacturer Code as
                 received in the response packet
    u16SrcAdd - Network address of the attributes source device
    u8SrcEP - Source endpoint
    u16ClstrID - Cluster ID
    u8CmdID - 0x0D – Discover Attributes command identifier
    u8Number - Number of attributes in the list
    u8Complete - If 0x00, there are more attributes to be read.
                 If 0x01, the list is complete
    AttrRec_t - List of attribute records. Each record consists
                of u16AttributeID and u8DataType.
  */

  /*
    Basic Cluster - RESET TO FACTORY DEFAULTS
    Cause a device to reset to its factory defaults

    Parameter - Description
    u8Mode - 0x12 Normally.
              Bits 0:1 - Indicate if DstAddr is 16 bits ShortAddress
                         (0x02), or 16 bits GroupAddress (0x01)
              Bit 4 – If set, disable default response
              Bit 5 – If set, direction is from server to client
    u16DstAdd - Network address of the device being reset
    u8DstEP - Destination endpoint
    u16ClstrID - 0x0000 - Basic Cluster ID
    u8CmdID - 0x00 – Reset to defaults command identifier
  */

  /*
    Identify Cluster - IDENTIFY
    Request device to physically identify itself

    Parameter - Description
    u8Mode - 0x12 Normally.
            Bits 0:1 - Indicate if DstAddr is 16 bits ShortAddress
                       (0x02), or 16 bits GroupAddress (0x01)
            Bit 4 – If set, disable default response
            Bit 5 – If set, direction is from server to client
    u8DstEP - Destination endpoint
    u16ClstrID - 0x0003 – Identify Cluster ID
    u8CmdID - 0x00 – Identify command identifier
    u16IDTime - Identify time in tens of seconds (0000 – FFFF)
  */

  /*
    Identify Cluster - IDENTIFY QUERY REQUEST
    Request device’s identification parameters

    Parameter - Description
    u8Mode - 0x12 Normally.
            Bits 0:1 - Indicate if DstAddr is 16 bits ShortAddress
                       (0x02), or 16 bits GroupAddress (0x01)
            Bit 4 – If set, disable default response
            Bit 5 – If set, direction is from server to client
    u16DstAdd - Network address of the device being identified
    u8DstEP - Destination endpoint
    u16ClstrID - 0x0003 – Identify Cluster ID
    u8CmdID - 0x01 – Identify Query command code
  */

  /*
    IDENTIFY QUERY RESPONSE

    Parameter - Description
    u8Mode - 0x12 Normally.
              Bits 0:1 - Indicate if DstAddr is 16 bits ShortAddress
                         (0x02), or 16 bits GroupAddress (0x01)
              Bit 4 – If set, disable default response
              Bit 5 – If set, direction is from server to client
    u16SrcAddr - Network address of device being identified
    u8SrcEndpoint - The source EndPoint. Represents the
                    application endpoint the data.
    u16Cluster - ID 0x0003 – Identify Cluster ID
    u8CmdID - 0x00 – Identify Query response command code
    u16TimeOut - How long the device will continue to identify
                 itself (in seconds).

    NOTE: No response When Time Out is ‘0’.
  */

  /*
    Groups Cluster - ADD GROUP

    Parameter - Description
    u8Mode - 0x12 Normally.
            Bits 0:1 - Indicate if DstAddr is 16 bits ShortAddress
                       (0x02), or 16 bits GroupAddress (0x01)
            Bit 4 – If set, disable default response
            Bit 5 – If set, direction is from server to client
    u16DstAdd - Network address of the destination address
    u8DstEP - Destination endpoint
    u16ClstrID - 0x0004 – Group Cluster ID
    u8CmdID - 0x00 – Add group command ID
    u16GroupID - Group ID
    u8GrpNmLen - The number of bytes in the name array
    u8GrpName[] - The name array (Max=16 bytes)
  */

  /*
    ADD GROUP RESPONSE

    Parameter - Description
    u8Mode - 0x12 Normally.
              Bits 0:1 - Indicate if DstAddr is 16 bits ShortAddress
                         (0x02), or 16 bits GroupAddress (0x01)
              Bit 4 – If set, disable default response
              Bit 5 – If set, direction is from server to client
    u16SrcAddr - Network address of device being identified
    u8SrcEndPnt - The source end point.
    u16ClstrID - 0x0004 - Group Cluster ID
    u8CmdID - 0x00 – Add group response command ID
    u8Status - 0x00 for Success, or Failure code
    u16GroupID - Group ID
  */

  /*
    Groups Cluster - VIEW GROUP

    Parameter - Description
    u8Mode - 0x12 Normally.
              Bits 0:1 - Indicate if DstAddr is 16 bits ShortAddress
                         (0x02), or 16 bits GroupAddress (0x01)
              Bit 4 – If set, disable default response
              Bit 5 – If set, direction is from server to client
    u16DstAdd - Network address of the destination address
    u8DstEP - Destination endpoint
    u16ClstrID - 0x0004 - Group Cluster ID
    u8CmdID - 0x01 - View Group command identifier
    u16GroupID - Group ID for this Scene
  */

  /*
    VIEW GROUP RESPONSE

    Parameter - Description
    u8Mode - 0x12 Normally.
              Bits 0:1 - Indicate if DstAddr is 16 bits ShortAddress
                         (0x02), or 16 bits GroupAddress (0x01)
              Bit 4 – If set, disable default response
              Bit 5 – If set, direction is from server to client
    u16SrcAddr - Network address of device being identified
    u8SrcEndPnt - The source end point.
    u16ClstrID - 0x0004 - Group Cluster ID
    u8CmdID - 0x01 - View Group response command identifier
    u8Status - 0x00 for Success, or Failure code
    u16GroupID - Group ID
    u8GrpNmLen - The number of bytes in the name array
    u8GrpName[] - The name array (Max=16 bytes)
  */

  /*
    Groups Cluster - GET GROUP MEMBERSHIP

    Parameter - Description
    u8Mode - 0x12 Normally.
              Bits 0:1 - Indicate if DstAddr is 16 bits ShortAddress
                         (0x02), or 16 bits GroupAddress (0x01)
              Bit 4 – If set, disable default response
              Bit 5 – If set, direction is from server to client
    u16DstAdd - Network address of the destination address
    u8DstEP - Destination endpoint
    u16ClstrID - 0x0004 - Group Cluster ID
    u8CmdID - 0x02 – Get Group Membership command identifier
    u8GroupCnt - Number of groups in the list
    u16GrpLst[] - The group list of which device is a member
  */

  // PAGE 37

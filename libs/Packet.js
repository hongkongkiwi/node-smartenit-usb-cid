var _ = require('underscore');

function Packet() {
  var SOP = 0x02; // Start of message header
  var CMD =  // Command
  var LEN =
  var PYLD = // Message Payload
  var FCS = // Frame Check Sequence
}

Packet.ZIGBEE_PROFILES = [
  {
    profile_name: 'Home Automation (HA) Profile',
    profile_id: 0x0104,
    zcl_clusters: [
      {
        zcl_category: 'HA/General',
        zcl_name: 'Basic',
        cid: 0x0000,
        client: true,
        server: true
      },
      {
        zcl_category: 'HA/General',
        zcl_name: 'Power Configuration',
        cid: 0x0001,
        client: true,
        server: true
      },
      {
        zcl_category: 'HA/General',
        zcl_name: 'Temperature Configuration',
        cid: 0x0002,
        client: true,
        server: true
      },
      {
        zcl_category: 'HA/General',
        zcl_name: 'Identify',
        cid: 0x0003,
        client: true,
        server: true
      },
      {
        zcl_category: 'HA/General',
        zcl_name: 'Groups',
        cid: 0x0004,
        client: true,
        server: false
      },
      {
        zcl_category: 'HA/General',
        zcl_name: 'Scenes',
        cid: 0x0005,
        client: true,
        server: false
      },
      {
        zcl_category: 'HA/General',
        zcl_name: 'On/Off',
        cid: 0x0006,
        client: true,
        server: false
      },
      {
        zcl_category: 'HA/General',
        zcl_name: 'On/Off Switch Configuration',
        cid: 0x0007,
        client: true,
        server: false
      },
      {
        zcl_category: 'HA/General',
        zcl_name: 'Level Control',
        cid: 0x0008,
        client: true,
        server: false
      },
      {
        zcl_category: 'HA/General',
        zcl_name: 'Alarms',
        cid: 0x0009,
        client: true,
        server: false
      },
      {
        zcl_category: 'HA/General',
        zcl_name: 'Time',
        cid: 0x000A,
        client: false,
        server: true
      },
      {
        zcl_category: 'HA/General',
        zcl_name: 'RSSI Location',
        cid: 0x000B,
        client: true,
        server: false
      },
      {
        zcl_category: 'HA/General',
        zcl_name: 'Analog Input (Basic)',
        cid: 0x000C,
        client: true,
        server: false
      },
      {
        zcl_category: 'HA/General',
        zcl_name: 'Analog Output (Basic)',
        cid: 0x000D,
        client: true,
        server: false
      },
      {
        zcl_category: 'HA/General',
        zcl_name: 'Analog Value (Basic)',
        cid: 0x000E,
        client: true,
        server: false
      },
      {
        zcl_category: 'HA/General',
        zcl_name: 'Binary Input (Basic)',
        cid: 0x000F,
        client: true,
        server: false
      },
      {
        zcl_category: 'HA/General',
        zcl_name: 'Binary Output (Basic)',
        cid: 0x0010,
        client: true,
        server: false
      },
      {
        zcl_name: 'Binary Value (Basic)',
        cid: 0x0011,
        client: true,
        server: false
      },
      {
        zcl_category: 'HA/General',
        zcl_name: 'Multistate Input (Basic)',
        cid: 0x0012,
        client: true,
        server: false
      },
      {
        zcl_category: 'HA/General',
        zcl_name: 'Multistate Output (Basic)',
        cid: 0x0013,
        client: true,
        server: false
      },
      {
        zcl_category: 'HA/General',
        zcl_name: 'Multistate Value (Basic)',
        cid: 0x0014,
        client: true,
        server: false
      },
      {
        zcl_category: 'HA/Closures',
        zcl_name: 'Shade Configuration': {
        cid: 0x0100
        client: true,
        server: false
      },
      {
        zcl_category: 'HA/Closures',
        zcl_name: 'Door Lock': {
        cid: 0x0101,
        client: true,
        server: false
      },
      {
        zcl_category: 'HA/HVAC',
        zcl_name: 'Thermostat',
        cid: 0x0201,
        client: true,
        server: false
      },
      {
        zcl_category: 'HA/HVAC',
        zcl_name: 'Pump Config. & Cntrl.',
        cid: 0x0200,
        client: true,
        server: false
      },
      {
        zcl_category: 'HA/HVAC',
        zcl_name: 'Fan Control',
        cid: 0x0202,
        client: true,
        server: false
      },
      {
        zcl_category: 'HA/HVAC',
        zcl_name: 'Dehumidification Control',
        cid: 0x0203,
        client: true,
        server: false
      },
      {
        zcl_category: 'HA/HVAC',
        zcl_name: 'Thermostat UI Config.',
        cid: 0x0204,
        client: true,
        server: false
      },
      {
        zcl_category: 'HA/M&S',
        zcl_name: 'Illuminance Measurement',
        cid: 0x0400,
        client: true,
        server: false
      },
      {
        zcl_category: 'HA/M&S',
        zcl_name: 'Illuminance Level Sensing',
        cid: 0x0401,
        client: true,
        server: false
      },
      {
        zcl_category: 'HA/M&S',
        zcl_name: 'Temperature Measurement',
        cid: 0x0402,
        client: true,
        server: false
      },
      {
        zcl_category: 'HA/M&S',
        zcl_name: 'Pressure Measurement',
        cid: 0x0403,
        client: true,
        server: false
      },
      {
        zcl_category: 'HA/M&S',
        zcl_name: 'Flow Measurement',
        cid: 0x0404,
        client: true,
        server: false
      },
      {
        zcl_category: 'HA/M&S',
        zcl_name: 'Relative Humidity Measurement',
        cid: 0x0405,
        client: true,
        server: false
      },
      {
        zcl_category: 'HA/M&S',
        zcl_name: 'Occupancy Sensing',
        cid: 0x0406,
        client: true,
        server: false
      },
      {
        zcl_category: 'Security & Safety',
        zcl_name: 'IAS Zone',
        cid: 0x0500,
        client: true,
        server: false
      },
      {
        zcl_category: 'Security & Safety',
        zcl_name: 'IAS ACE',
        cid: 0x0501,
        client: true,
        server: false
      },
      {
        zcl_category: 'Security & Safety',
        zcl_name: 'IAS WD',
        cid: 0x0502,
        client: true,
        server: false
      },
      {
        zcl_category: 'Smart Energy',
        zcl_name: 'Simple Metering',
        cid: 0x0702,
        client: true,
        server: false
      }
    ]
  },
  {
    profile_name: 'Smart Energy (SE) Profile - As a Coordinator (ESP)',
    profile_id: 0x0109,
    zcl_clusters: [
      {
        zcl_category: 'Domain',
        zcl_name: 'Basic',
        cid: 0x0000,
        client: true,
        server: true
      },
      {
        zcl_category: 'Domain',
        zcl_name: 'Identify',
        cid: 0x0003,
        client: true,
        server: true
      },
      {
        zcl_category: 'Domain',
        name: 'Time',
        cid: 0x000A,
        client: false,
        server: true
      },
      {
        zcl_category: 'Smart Energy',
        zcl_name: 'Price',
        cid: 0x0700,
        client: false,
        server: true
      },
      {
        zcl_category: 'Smart Energy',
        zcl_name: 'Demand Response and Load Control',
        cid: 0x0701,
        client: false,
        server: true
      },
      {
        zcl_category: 'Smart Energy',
        zcl_name: 'Simple Metering',
        cid: 0x0702,
        client: true,
        server: false
      },
      {
        zcl_category: 'Smart Energy',
        zcl_name: 'Message',
        cid: 0x0703,
        client: false,
        server: true
      },
      {
        zcl_category: 'Smart Energy',
        zcl_name: 'Key Establishment',
        cid: 0x0800,
        client: false,
        server: true
      }
    ]
  },
  'Smart Energy (SE) Profile - As a Router (Gateway)': {
    id: 0x0109,
    zcl_clusters: [
      {
        zcl_category: 'Domain',
        zcl_name: 'Basic',
        cid: 0x0000,
        client: true,
        server: true
      },
      {
        zcl_category: 'Domain',
        zcl_name: 'Identify',
        cid: 0x0003,
        client: true,
        server: true
      },
      {
        zcl_category: 'Domain',
        zcl_name: 'Time',
        cid: 0x000A,
        client: true,
        server: false
      },
      {
        zcl_category: 'Smart Energy',
        zcl_name: 'Price',
        cid: 0x0700,
        client: true,
        server: false
      },
      {
        zcl_category: 'Smart Energy',
        zcl_name: 'Demand Response and Load Control',
        cid: 0x0701,
        client: true,
        server: false
      },
      {
        zcl_category: 'Smart Energy',
        zcl_name: 'Simple Metering',
        cid: 0x0702,
        client: true,
        server: false
      },
      {
        zcl_category: 'Smart Energy',
        zcl_name: 'Message',
        cid: 0x0703,
        client: true,
        server: false
      },
      {
        zcl_category: 'Smart Energy',
        zcl_name: 'Key Establishment',
        cid: 0x0800,
        client: true,
        server: false
      }
    ]
  }
};

Packet.COMMANDS = {
  // System Commands
  SYSTEM_PING: 0x0000, // Ping
  SYSTEM_RESET_REQUEST: 0x0001, // Reset
  SYSTEM_GET_TIME: 0x0002, // Get Time
  SYSTEM_SET_TIME: 0x0003, // Set Time
  SYSTEM_START_NETWORK: 0x0005, // Co-Ordinator
  SYSTEM_JOIN_NETWORK: 0x0005, // Router
  SYSTEM_UPDATE_NETWORK: 0x0006, // Update Network

  // Node Requests
  REGISTER_NODE: 0x0009,
  GET_APS_KEY_TABLE_REQUEST: 0x000A,
  REQUEST_NETWORK_OR_PARTNER_KEY: 0x000C,
  MODIFY_PERMIT_JOIN_REQUEST: 0x0010,
  SHORT_NETWORK_ADDRESS_REQUEST: 0x0012
  IEEE_ADDRESS_REQUEST: 0x0013,
  NODE_DESCRIPTOR_REQUEST: 0x0014,
  SIMPLE_DESCRIPTOR_REQUEST: 0x0015,
  ACTIVE_ENDPOINT_REQUEST: 0x0016,
  USER_DESCRIPTOR_REQUEST: 0x0017,
  USER_DESCRIPTOR_SET_REQUEST: 0x0018,
  MATCH_DESCRIPTOR_REQUEST: 0x0019,
  NETWORK_LEAVE_REQUEST: 0x001A,
  POWER_DESCRIPTOR_REQUEST: 0x001D,
  ACTIVE_NETWORK_TABLE_REQUEST: 0x001E,
  ROUTING_TABLE_REQUEST: 0x001F,
  BIND_REQUEST: 0x0020,
  UNBIND_REQUEST: 0x0021,
  BIND_TABLE_REQUEST: 0x0023,

  // OTA Commands
  OTA_LOAD_IMAGE_BLOCK_REQUEST: 0x0028,
  OTA_ACTION_REQUEST: 0x0029,

  // Cluster Commands
  CLUSTER_COMMANDS: 0x0030,
  CLUSTER_GENERAL_READ_ATTRIBUTES: 0x0030,
  CLUSTER_GENERAL_WRITE_ATTRIBUTES: 0x0030,
  CLUSTER_GENERAL_WRITE_ATTRIBUTE_UNDIVIDED: 0x0030,
  CLUSTER_GENERAL_WRITE_ATTRIBUTE_NO_RESPONSE: 0x0030,
  CLUSTER_GENERAL_CONFIGURE_REPORTING: 0x0030,
  CLUSTER_GENERAL_READ_REPORTING_CONFIGURATION: 0x0030,
  CLUSTER_GENERAL_DISCOVER_ATTRIBUTES: 0x0030,
  CLUSTER_BASIC_CLUSTER_RESET_TO_FACTORY_DEFAULTS: 0x0030,
  CLUSTER_IDENTIFY_CLUSTER_IDENTIFY: 0x0030,
  CLUSTER_IDENTIFY_QUERY_REQUEST: 0x0030,

  // Groups Cluster
  GROUPS_CLUSTER_ADD_GROUP: 0x0030,
  GROUPS_CLUSTER_VIEW_GROUP: 0x0030,
  GROUPS_CLUSTER_GET_GROUP_MEMBERSHIP: 0x0030,
  GROUPS_CLUSTER_REMOVE_GROUP: 0x0030,
  GROUPS_CLUSTER_REMOVE_ALL_GROUPS: 0x0030,
  GROUPS_CLUSTER_ADD_GROUP_IF_IDENTIFYING: 0x0030,
  GROUPS_CLUSTER_ADD_SCENE: 0x0030,

  // Scenes Cluster
  SCENES_CLUSTER_VIEW_SCENE: 0x0030,
  SCENES_CLUSTER_REMOVE_SCENE: 0x0030,
  SCENES_CLUSTER_REMOVE_ALL_SCENES: 0x0030,
  SCENES_CLUSTER_STORE_SCENE: 0x0030,
  SCENES_CLUSTER_RECALL_SCENE: 0x0030,
  SCENES_CLUSTER_GET_SCENE_MEMBERSHIP: 0x0030,

  // On/Off Cluster
  ON_OFF_CLUSTER_SEND_OFF: 0x0030,
  ON_OFF_CLUSTER_SEND_ON: 0x0030,
  ON_OFF_CLUSTER_SEND_TOGGLE: 0x0030,
  ON_OFF_CLUSTER_SEND_RELAY_OFF: 0x0030,
  ON_OFF_CLUSTER_SEND_RELAY_ON: 0x0030,
  ON_OFF_CLUSTER_SEND_RELAY_TOGGLE: 0x0030,
  ON_OFF_CLUSTER_SET_RELAY_PATTERN: 0x0030,
  ON_OFF_CLUSTER_GET_RELAY_PATTERN: 0x0030,
  ON_OFF_CLUSTER_SET_MODE_ATTRIBUTE: 0x0030,
  ON_OFF_CLUSTER_GET_MODE_ATTRIBUTE: 0x0030,
  ON_OFF_CLUSTER_SKIP_FORWARD_IN_PROGRAM: 0x0030,
  ON_OFF_CLUSTER_SKIP_BACKWARD_IN_PROGRAM: 0x0030,
  ON_OFF_CLUSTER_PROGRAM_ON: 0x0030,
  ON_OFF_CLUSTER_SET_TIMER_VALUES: 0x0030,
  ON_OFF_CLUSTER_GET_TIMER_VALUES: 0x0030,
  ON_OFF_CLUSTER_SET_PUMP_CONFIGURATION: 0x0030,
  ON_OFF_CLUSTER_GET_PUMPS: 0x0030,
  ON_OFF_CLUSTER_SET_RELAY_NAME: 0x0030,
  ON_OFF_CLUSTER_GET_RELAY_NAME: 0x0030,

  // Level Control
  LEVEL_CONTROL_CLUSTER_MOVE_TO_LEVEL: 0x0030,
  LEVEL_CONTROL_CLUSTER_MOVE: 0x0030,
  LEVEL_CONTROL_CLUSTER_STEP: 0x0030,
  LEVEL_CONTROL_CLUSTER_STOP: 0x0030,

  // Price Cluster
  PRICE_CLUSTER_GET_CURRENT_PRICE: 0x0030,
  PRICE_CLUSTER_GET_SCHEDULED_PRICES: 0x0030,
  PRICE_CLUSTER_PRICE_ACKNOWLEDGEMENT: 0x0030,
  PRICE_CLUSTER_GET_BLOCK_PERIODS: 0x0030,

  // DRLC Cluster
  DRLC_CLUSTER_REPORT_EVENT_STATUS: 0x0030,
  DRLC_CLUSTER_GET_SCHEDULED_EVENTS: 0x0030,

  // Message Cluster
  MESSAGE_CLUSTER_GET_LAST_MESSAGE: 0X0030,
  MESSAGE_CLUSTER_MESSAGE_CONFIRMATIONL: 0X0030,
}

Packet.RESPONSES_=_{
  PING: 0x1000,
  //MESSAGE_ERR: 0x90XX,
  RESET: 0x0001,
  GET_TIME: 0x1002,
  SET_TIME: 0x1003,
  START_NETWORK: 0x1005,
  SYSTEM_UPDATE_NETWORK: 0x1006,
  REGISTER_NODE: 0x1009,
  GET_APS_KEY: 0x100A,
  REQUEST_KEY: 0x100C,
  MODIFY_PERMIT_JOIN: 0x1010,
  DEVICE_JOINED: 0x1011,
  NETWORK_ADDRESS: 0x1012,
  NODE_DESCRIPTOR: 0x1014,
  SIMPLE_DESCRIPTOR: 0x1015,
  ACTIVE_ENDPOINT: 0x1016,
  USER_DESCRIPTOR: 0x1017,
  USER_DESCRIPTOR_SET: 0x1018,
  MATCH_DESCRIPTOR: 0x1019,
  NETWORK_LEAVE_REQUEST_CONFIRM: 0x101A,
  END_DEVICE_ANNOUNCE: 0x101B,
  DEVICE_LEAVE_ANNOUNCE: 0x101C,
  POWER_DESCRIPTOR_RESPONSE: 0x101D,
  ACTIVE_NETWORK_TABLE: 0x101E,
  ROUTING_TABLE: 0x101E,
  BIND_RESOPNSE: 0x1020,
  UNBIND_RESPONSE: 0x1021,
  BIND_TABLE: 0x1023,
  OTA_LOAD_IMAGE_BLOCKL_0x1028,
  OTA_ACTION_REQUEST: 0x1029,
  //ZDP_COMMAND_NEGATIVE: 0x90XX,
  DEFAULT_RESPONSE: 0x1031,
  CLUSTER_COMMAND_NOT_SENT: 0x9030,
  READ_ATTRIBUTES: 0x1031,
  WRITE_ATTRIBUTES: 0x1031,
  CONFIGURE_REPORTING: 0x1031,
  READ_REPORTING_CONFIGURATION: 0x1031,
  REPORT_ATTRIBUTES_MESSAGE: 0x1031,
  DISCOVER_ATTRIBUTES: 0x1031,
  IDENTIFY_QUERY: 0x1030,
  ADD_GROUP: 0x1030,
  VIEW_GROUP: 0x1030,
  GET_GROUP_MEMBERSHIP: 0x1030,
  REMOVE_GROUP: 0x1030,
  ADD_SCENE: 0x1030,
  VIEW_SCENE: 0x1030,
  REMOVE_SCENE: 0x1030,
  REMOVE_ALL_SCENES: 0x1030,
  STORE_SCENE: 0x1030,
  GET_SCENE_MEMBERSHIP: 0x1030,
  RELAY_STATUS: 0x1030,
  RELAY_MODE_ATTRIBUTE: 0x1030,
  RELAY_GET_TIMERS: 0x1030,
  GET_PUMPS: 0x1030,
  RELAY_GET_NAMES: 0x1030,
  PRICE_CLUSTER_PUBLISH_PRICE: 0x0030,
  DRLC_CLUSTER_LOAD_CONTROL_EVENT: 0x0030,
  DRLC_CLUSTER_CANCEL_LOAD_CONTROL_EVENT: 0x0030,
  DRLC_CLUSTER_CANCEL_ALL_LOAD_CONTROL_EVENTS: 0x0030,
  MESSAGE_CLUSTER_DISPLAY_MESSAGE: 0x0030,
  MESSAGE_CLUSTER_CANCEL_MESSAGE: 0x0030,
}

/*
  SYSTEM PING
  PING device to verify if it is active and to check its capability
*/
Packet.pingDevice = function() {
  return new Packet(Packet.COMMANDS.PING);
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
  return new Packet(Packet.COMMANDS.SYSTEM_RESET_REQUEST, [u8Type]);
}

/*
  SYSTEM GET TIME
  Gets current system time
*/
Packet.systemGetTime = function() {
  return new Packet(Packet.COMMANDS.SYSTEM_GET_TIME);
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

  return new Packet(Packet.COMMANDS.SYSTEM_SET_TIME, [u32Time, i32TimeZone, u32DstStart, u32DstEnd, u32DstShift]);
}

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

  return new Packet(Packet.COMMANDS.SYSTEM_START_NETWORK, [u16PanID, u8Channel]);
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

  return new Packet(Packet.COMMANDS.SYSTEM_JOIN_NETWORK, [u16PanID, u8Channel]);
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

  return new Packet(Packet.COMMANDS.SYSTEM_UPDATE_NETWORK, [u16DstAdd, u32ChMask, u8ScanDur, u8ScanCount]);
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

  return new Packet(Packet.COMMANDS.REGISTER_NODE, [u64IeeeAdd, u8LnkKey]);
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

  return new Packet(Packet.COMMANDS.GET_APS_KEY_TABLE_REQUEST, [u8StartIdx, u64IeeeAdd]);
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

  return new Packet(Packet.COMMANDS.REQUEST_NETWORK_OR_PARTNER_KEY, [u8KeyType, u64IeeeAdd]);
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

  return new Packet(Packet.COMMANDS.MODIFY_PERMIT_JOIN_REQUEST, [u8Mode, u16oru32DstAdd, u8Duration]);
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

  return new Packet(Packet.COMMANDS.SHORT_NETWORK_ADDRESS_REQUEST, [u64IEEE, u8ReqType, u8StartIdx]);
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

  return new Packet(Packet.COMMANDS.IEEE_ADDRESS_REQUEST, [u64IEEE, u8ReqType, u8StartIdx]);
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

  return new Packet(Packet.COMMANDS.NODE_DESCRIPTOR_REQUEST, [u16DstAdd, u16Interest]);
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

  return new Packet(Packet.COMMANDS.SIMPLE_DESCRIPTOR_REQUEST, [u16DstAdd, u16Interest, u8EndPoint]);
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

  return new Packet(Packet.COMMANDS.ACTIVE_ENDPOINT_REQUEST, [u16DstAdd, u16Interest]);
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

  return new Packet(Packet.COMMANDS.USER_DESCRIPTOR_REQUEST, [u16SrcAdd, u16DstAdd]);
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

  return new Packet(Packet.COMMANDS.USER_DESCRIPTOR_SET_REQUEST, [u16SrcAdd, u16Interest, u8DescLen, u8Desc]);
}


Packet.setCommand = function(command) {
  /*
  Command identification. The 16-bit number
  encodes information as follows:
  Bit 15 is the negative acknowledge bit. If set it
  indicates the command was not executed
  correctly. Normally, a status byte will be
  present in the message body.
  Bit 14 is the ACK request bit. If set in a request,
  an initial acknowledge response is expected
  prior to any actual over-the-air or delayed device
  response.
  Bit 12 is the Response Bit. If set it indicates a
  response message (from ZBCID to host.)
  Bits 11:0 are the Command Number as follows:
  0x000-0x00F System Commands (Reset, Enter
  Flash Mode, Set Clock, etc.)
  0x010-0x01F Device Information and Network
  Commands
  0x020-0x02F Binding Commands
  0x030-0x03F Cluster Commands
  */
}

Packet.setPayload = function(buf) {
  // This is the message payload which varies in length from 0 to n bytes.
}

Packet.getBuffer = function() {

}

module.exports = Packet;

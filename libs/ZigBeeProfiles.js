module.exports = [
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
        zcl_name: 'Shade Configuration',
        cid: 0x0100,
        client: true,
        server: false
      },
      {
        zcl_category: 'HA/Closures',
        zcl_name: 'Door Lock',
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
  {
    profile_name: 'Smart Energy (SE) Profile - As a Router (Gateway)',
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
];

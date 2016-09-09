module.exports = {
  Commands: {
    // System Commands (0x000-0x00F)
    SYSTEM_PING: 0x0000, // Ping
    SYSTEM_RESET_REQUEST: 0x0001, // Reset
    SYSTEM_GET_TIME: 0x0002, // Get Time
    SYSTEM_SET_TIME: 0x0003, // Set Time
    SYSTEM_START_NETWORK: 0x0005, // Co-Ordinator
    SYSTEM_JOIN_NETWORK: 0x0005, // Router
    SYSTEM_UPDATE_NETWORK: 0x0006, // Update Network

    // Device Information and Network Commands (0x010-0x01F)
    REGISTER_NODE: 0x0009,
    GET_APS_KEY_TABLE_REQUEST: 0x000A,
    REQUEST_NETWORK_OR_PARTNER_KEY: 0x000C,
    MODIFY_PERMIT_JOIN_REQUEST: 0x0010,
    SHORT_NETWORK_ADDRESS_REQUEST: 0x0012,
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

    //  Binding Commands (0x020-0x02F)
    BIND_REQUEST: 0x0020,
    UNBIND_REQUEST: 0x0021,
    BIND_TABLE_REQUEST: 0x0023,

    // OTA Commands
    OTA_LOAD_IMAGE_BLOCK_REQUEST: 0x0028,
    OTA_ACTION_REQUEST: 0x0029,

    // Cluster Commands (0x030-0x03F)
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
  },
  Responses: {
    SYSTEM_PING_RESPONSE: 0x1000,
    //MESSAGE_ERR: 0x90XX,
    RESET_RESPONSE: 0x0001,
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
    OTA_LOAD_IMAGE_BLOCKL: 0x1028,
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
}

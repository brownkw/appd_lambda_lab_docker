const fs = require('fs');
const Logger = require('../logger');
const util = require('util');

class AppConfig {
    constructor() {
        this.logger = new Logger().getInstance();
        var graph_file_path = process.env.GRAPH_FILE;        
        var tier_name = "web-api";
        if (process.env.GRAPH_TIER_NAME) {
            tier_name = process.env.GRAPH_TIER_NAME;
        }
        else {
            if (process.env.APPDYNAMICS_AGENT_TIER_NAME) {
               tier_name = process.env.APPDYNAMICS_AGENT_TIER_NAME;
            }
        }

        var graph_json = JSON.parse(fs.readFileSync(graph_file_path));        
        this.props = graph_json[tier_name];
        
        if (!this.props) {
            this.props = {};
        }

        for (var path in this.props.paths) {
            this.logger.log('info', util.format('Path: %s , Data: %s', path, JSON.stringify(this.props.paths[path])));
        }

    }
}

class AppConfigSingleton {
    constructor() {
        if (!AppConfigSingleton.instance) {
            AppConfigSingleton.instance = new AppConfig();
        }
    }

    getInstance() {
        return AppConfigSingleton.instance.props;
    }
}

module.exports = AppConfigSingleton;
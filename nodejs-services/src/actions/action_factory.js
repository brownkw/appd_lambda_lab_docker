const _ = require('lodash');
const Logger = require('../logger');

class ActionFactory {
    constructor(actions) {
        this.actions = actions;
        this.logger = new Logger().getInstance();        
    }

    get_actions() {
        var retval = [];
        var t = this;

        retval = _(this.actions).map(function(a) {
            var path = "./" + a.type;            
            try {
                var action = new (require(path))(a.name, a.properties);                            
                return action;
            } catch (e) {
                t.logger.log('error', e);
                return null;
            }
        }).filter(function(f) {
            return f !== null;
        }).value();

        return retval;
    }
}

module.exports = ActionFactory;
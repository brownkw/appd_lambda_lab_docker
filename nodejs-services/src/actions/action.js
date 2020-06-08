const Logger = require('../logger');

class Action { 
    constructor(name, props) {
        if (!this.execute) {
            throw new Error("Execute function not implemented!");
        }

        this.name = name;
        this.props = props;
        this.type = "";
        this.logger = new Logger().getInstance();
    }
}

module.exports = Action;
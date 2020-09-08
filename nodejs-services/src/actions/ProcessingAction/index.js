const Action = require('../action');
const _ = require('lodash');
const util = require('util');

class ProcessingAction extends Action {

    constructor(name, props) {
        super(name, props);
        this.type = "ProcessingAction";
    }

    async execute() {
        this.logger.log('info', 'Executing ' + this.type);

        var should_run = true;
        var duration = _.random(this.props.minDuration, this.props.maxDuration);
        var load = this.props.load;
        if (this.props.canSpike) {
            if (this.props.pctSlowTxns && _.random(true) <= this.props.pctSlowTxns) {
                this.logger.log('info', 'Spiking processing');
                duration = Math.round(duration * this.props.spikeMultiplier);
            }
        }                

        await new Promise(resolve => setTimeout(resolve, duration));
    }

}

module.exports = ProcessingAction;
const Action = require('../action');
const _ = require('lodash');

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

        var start = function () {
            should_run = true;
            blockCpuFor(duration);
            setTimeout(start, 1000 * (1 - load));
        }

        var blockCpuFor = function (ms) {
            var now = new Date().getTime();
            var result = 0
            while (should_run) {
                result += Math.random() * Math.random();
                if (new Date().getTime() > now + ms)
                    return;
            }
        }

        start();
    }

}

module.exports = ProcessingAction;
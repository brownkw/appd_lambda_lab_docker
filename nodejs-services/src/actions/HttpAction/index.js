const request = require('request-promise');
const Action = require('../action');

class HttpAction extends Action {
    constructor(name, props) {
        super(name, props);
        this.type = "HttpAction";
    }

    async execute() {        
        var h = this;
        h.logger.log('info', 'Executing ' + h.type);
        try {
            var resp = await request({
                uri: h.props.url,
                method: h.props.requestMethod
            });
            h.logger.log('debug', resp);
        } catch (e) {
            h.logger.log('error', e);
        }
        // request({
        //     uri: h.props.url,
        //     method: h.props.requestMethod
        // }).then(function(body) {
        //     h.logger.log('debug', body);
        // }).catch(function(err) {
        //     h.logger.log('error', err); 
        // });
        // request({
        //     uri: h.props.url,
        //     method: h.props.requestMethod
        // }, function(err, resp, body) {
        //     if (err) {
        //         h.logger.log('error', err);
        //     }
        //     h.logger.log('info', JSON.stringify(resp));
        //     h.logger.log('debug', body);
        // });
    }
}

module.exports = HttpAction;

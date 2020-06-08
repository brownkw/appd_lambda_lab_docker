/**
 * @module logger
 */

const winston = require('winston');
const path = require('path');

/**
 * Provides logging
 * 
 * @class
 */
class Logger {

    /**
     * Instantiates an instance of the Logger class
     * 
     * @constructor
     * @param {Object} opts Object with options to be used by the logger
     */
    constructor() {
        var ts_format = () => (new Date()).toLocaleDateString() + ' - ' + (new Date()).toLocaleTimeString();        
        var consoleLevel = process.env.DEBUG_LEVEL || 'info'; 
        
        this.logger = winston.createLogger({
            format: winston.format.combine(
                //winston.format.label({ label: '[my-label]' }),
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                //
                // The simple format outputs
                // `${level}: ${message} ${[Object with everything else]}`
                //
                //winston.format.simple()
                //
                // Alternatively you could use this custom printf format if you
                // want to control where the timestamp comes in your final message.
                // Try replacing `format.simple()` above with this:
                //
                winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
            ),
            transports: [
                new (winston.transports.Console)({
                    name: 'console',
                    level: consoleLevel
                })
            ]
        });
    }
}

class LoggerSingleton {
    constructor(opts) {
        if (!LoggerSingleton.instance) {
            LoggerSingleton.instance = new Logger(opts);
        }
    }

    getInstance() {
        return LoggerSingleton.instance.logger;
    }
}

module.exports = LoggerSingleton;
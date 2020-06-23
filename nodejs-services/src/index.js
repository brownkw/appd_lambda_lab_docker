/**
 * Module dependencies.
 */

 // If AppD environment variables are set, start profiling.
if (appdEnvVarsSet()) {
  require("appdynamics").profile();
}


var app = require('./app');
var debug = require('debug')('nodejs-services:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

function appdEnvVarsSet() {
  return (process.env.APPDYNAMICS_CONTROLLER_HOST_NAME &&
  process.env.APPDYNAMICS_CONTROLLER_PORT &&
  process.env.APPDYNAMICS_AGENT_APPLICATION_NAME &&   
  process.env.APPDYNAMICS_AGENT_ACCOUNT_NAME &&
  process.env.APPDYNAMICS_AGENT_ACCOUNT_ACCESS_KEY && 
  process.env.APPDYNAMICS_AGENT_TIER_NAME && 
  process.env.APPDYNAMICS_AGENT_NODE_NAME);
}
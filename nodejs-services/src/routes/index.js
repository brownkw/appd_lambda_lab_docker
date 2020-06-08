var express = require('express');
var router = express.Router();
var AppConfig = require('../app_config');
var Logger = require('../logger');
var util = require('util');
var ActionFactory = require('../actions/action_factory');

var app_config = new AppConfig().getInstance();
var logger = new Logger().getInstance();

router.all('/favicon.ico', (req, res, next) => res.status(204));

/* GET home page. */
router.all('*', function(req, res, next) {
  // res.json(app_config);
  
  logger.log('info', util.format('Path: %s', req.path));
  var actions = {};
  if (app_config.paths.hasOwnProperty(req.path)) {
    actions = app_config.paths[req.path].actions;
  } else {
    actions = app_config.paths["*"].actions;
  }

  var action_factory = new ActionFactory(actions);
  var actions_to_execute = action_factory.get_actions();

  for (var i = 0; i < actions_to_execute.length; i++) {
    actions_to_execute[i].execute();
  }

  res.json(actions);

});

module.exports = router;

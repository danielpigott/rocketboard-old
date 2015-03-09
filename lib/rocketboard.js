var redis = require('redis');
var _ = require('lodash');

function Rocketboard(name, options) {
  defaults = {
    redis : {
       host : 'localhost',
       port : 6379
    } 
  };
  this.options = _.extend(defaults, options);
  this.name = name;

  this.connect(this.options.redis);
}

var proto = Rocketboard.prototype;

proto.connect = function(options) {
  options || (options = {});

  this.redis = redis.createClient(options.port, options.host);
  if (options.db) {
    this.redis.select(options.db);
  }
};

module.exports = Rocketboard;

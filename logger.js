'use strict';

const EventEmitter = require('events').EventEmitter;
const util = require('util');

const ContextLogger = require('./context');

function Logger() {
  this.host = process.env.HOSTNAME || 'undefined-hostname';
  this.service = process.env.SERVICE_NAME || 'undefined-service';
  this.format = function format(context, level, line) {
    const now = (new Date()).toISOString();
    const host = this.host;
    const service = this.service;

    return `${now} ${service} ${host} ${level} ${context} ${line}`;
  };
  this.write = console.log;
  this.writeError = console.error;

  EventEmitter.call(this);
}

util.inherits(Logger, EventEmitter);
const proto = Logger.prototype;

proto.for = function createContextLogger(context) {
  return new ContextLogger(this, context);
};

module.exports = new Logger();

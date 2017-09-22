'use strict';

function ContextLogger(logger, name) {
  if (!logger) throw new Error();
  this.logger = logger;
  this.name = name || 'undefined-context';
}

const proto = ContextLogger.prototype;

proto._format = function(level, line) {
  return this.logger.format(this.name, level, line);
};

proto.info = function(line) {
  this.logger.write(this._format('INFO', line));
};

proto.warn = function(line) {
  this.logger.write(this._format('WARN', line));
};

proto.error = function(line) {
  if (line instanceof Error) {
    this.logger.writeError(this._format('ERROR', line.message));
    this.stack(line);
  } else {
    this.logger.writeError(this._format('ERROR', line));
  }
};

proto.fatal = function(line) {
  if (line instanceof Error) {
    this.logger.writeError(this._format('FATAL', line.message));
    this.stack(line);
  } else {
    this.logger.writeError(this._format('FATAL', line));
  }
};

proto.stack = function(line) {
  this.logger.writeError(this._format('STACK', line));
};

module.exports = ContextLogger;

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

proto._handleError = function(level, line, error) {
  // Called with message and error
  if (error) {
    this.logger.writeError(this._format(level, line));
    this.stack(error);
    return;
  }

  // Called with error only
  if (line instanceof Error) {
    this.logger.writeError(this._format(level, line.message));
    this.stack(line);
    return;
  }

  // Called with message
  this.logger.writeError(this._format(level, line));
};

proto.error = function(line, error) {
  this._handleError('ERROR', line, error);
};

proto.fatal = function(line, error) {
  this._handleError('FATAL', line, error);
};

proto.stack = function(line) {
  this.logger.writeError(this._format('STACK', line.stack));
};

module.exports = ContextLogger;

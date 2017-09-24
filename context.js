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
  this.logger.emit('info', line);
};

proto.warn = function(line) {
  this.logger.write(this._format('WARN', line));
  this.logger.emit('warn', line);
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
  this.logger.emit('err', line, error);
};

proto.fatal = function(line, error) {
  this._handleError('FATAL', line, error);
  this.logger.emit('fatal', line, error);
};

proto.stack = function(error) {
  this.logger.writeError(this._format('STACK', error.stack));
  this.logger.emit('stack', error);
};

module.exports = ContextLogger;

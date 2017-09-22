'use strict';

const sinon = require('sinon');
const expect = require('chai').expect;

const logger = require('./logger');

describe('Logger', () => {
  // FIXME: Quick tests to provide minimum coverage. Improve.

  let cxtLogger;

  before(() => {
    logger.format = function(context, level, line) {
      const now = 'x';
      const service = 'y';
      const host = 'z';

      return `${now} ${service} ${host} ${level} ${context} ${line}`;
    };
    cxtLogger = logger.for('cxt');
  });

  beforeEach(() => {
    logger.write = sinon.spy();
    logger.writeError = sinon.spy();
  });

  describe('.info', () => {
    it('should write the message in stdout', function() {
      const spy = logger.write;

      cxtLogger.info('test');

      expect(spy.callCount).to.equal(1);
      const param = spy.getCall(0).args[0];
      expect(param).to.equal('x y z INFO cxt test');
    });
  });

  describe('.warn', () => {
    it('should write the message in stdout', function() {
      const spy = logger.write;

      cxtLogger.warn('test');

      expect(spy.callCount).to.equal(1);
      const param = spy.getCall(0).args[0];
      expect(param).to.equal('x y z WARN cxt test');
    });
  });

  describe('.error', () => {
    it('should write the message in stderr', function() {
      const spy = logger.writeError;

      cxtLogger.error('test');

      expect(spy.callCount).to.equal(1);
      const param = spy.getCall(0).args[0];
      expect(param).to.equal('x y z ERROR cxt test');
    });
  });

  describe('.fatal', () => {
    it('should write the message in stderr', function() {
      const spy = logger.writeError;

      cxtLogger.fatal('test');

      expect(spy.callCount).to.equal(1);
      const param = spy.getCall(0).args[0];
      expect(param).to.equal('x y z FATAL cxt test');
    });
  });
});

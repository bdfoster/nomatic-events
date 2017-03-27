import 'mocha';
import {expect} from 'chai';
import {EventEmitter} from '../../src';

describe('EventEmitter', function () {
  var emitter;
  var listener;
  var listenerResult = null;
  var callback = function (data) {
    if (this.listeners) {
      listenerResult = data;
    }
  };

  beforeEach(function () {
    emitter = new EventEmitter();
    listener = emitter.on(/test/i, callback, true);
  });

  describe('new', function () {
    it('should create a new EventEmitter object', function () {
      //noinspection BadExpressionStatementJS,JSUnresolvedVariable
      expect(emitter).to.have.keys([
        'listeners'
      ]);
    });
  });

  describe('#listeners', function () {
    it('should have one listener', function () {
      //noinspection JSUnresolvedVariable
      expect(emitter.listeners).to.have.length(1);
    });
  });

  describe('#on()', function () {
    it('should return an EventListener type', function () {
      //noinspection BadExpressionStatementJS,JSUnresolvedVariable
      expect(listener).to.exist;
    });

    it('should return an executable EventListener type', function () {
      emitter.emit("TEST", true);
      //noinspection BadExpressionStatementJS,JSUnresolvedVariable
      expect(listenerResult).to.equal(true);
    });
  });

  describe('#emit()', function () {
    it('should execute listener', function () {
      expect(emitter.listeners.length).to.equal(1);
      emitter.emit('TEST', 1234, 5678, 90);
      expect(listenerResult).to.equal(1234);
    });
  });

  describe('#pop()', function () {
    it('should remove the EventListener object from the EventEmitter', function () {
      expect(emitter.listeners.length).to.equal(1);
      expect(emitter.pop(listener)).to.equal(true);
      expect(emitter.listeners.length).to.equal(0);
    });
  });
});



import 'mocha';
import {expect} from 'chai';
import {EventEmitter, EventListener} from '../../src';

describe('EventEmitter', function () {
  let emitter;
  let listener;
  let listenerResult = null;
  let callback = function (data) {
    if (this.listeners) {
      listenerResult = data;
    }
  };

  beforeEach(() => {
    emitter = new EventEmitter();
    listener = emitter.on(/test/i, callback, true);
  });

  describe('#constructor()', () => {
    it('should create a new instance', () => {
      //noinspection BadExpressionStatementJS,JSUnresolvedVariable
      expect(emitter).to.have.keys([
        'listeners',
        '_maxListeners'
      ]);
    });

    it('should create a new instance with `maxListeners` set to 0', () => {
      expect(new EventEmitter(0).maxListeners).to.equal(0);
    });

    it('should create a new instance with `maxListeners` set to -1 (and turn it to 0)', () => {
      expect(new EventEmitter(-1).maxListeners).to.equal(0);
    });
  });

  describe('#listeners', () => {
    it('should have one listener', () => {
      //noinspection JSUnresolvedVariable
      expect(emitter.listeners).to.have.length(1);
    });
  });

  describe('#on()', () => {
    it('should return an EventListener type', () => {
      //noinspection BadExpressionStatementJS,JSUnresolvedVariable
      expect(listener).to.exist;
    });

    it('should return an executable EventListener type', () => {
      emitter.on('random', function (data) { listenerResult = data; });
      emitter.emit('random', true);
      //noinspection BadExpressionStatementJS,JSUnresolvedVariable
      expect(listenerResult).to.equal(true);
    });
  });

  describe('#once()', () => {
    it('should only execute the listener once', () => {
      emitter.once('random2', function(data) { listenerResult = data; });
      expect(emitter.listeners.length).to.equal(2);
      emitter.pop(listener);
      expect(emitter.listeners.length).to.equal(1);
      emitter.emit('random2', true);
      expect(listenerResult).to.equal(true);
      expect(emitter.listeners.length).to.equal(0);
    });
  });

  describe('#emit()', () => {
    it('should execute listener', () => {
      expect(emitter.listeners.length).to.equal(1);
      emitter.emit('TEST', 1234, 5678, 90);
      expect(listenerResult).to.equal(1234);
    });
  });

  describe('#pop()', () => {
    it('should remove listener and return true', () => {
      expect(emitter.listeners.length).to.equal(1);
      expect(emitter.pop(listener)).to.equal(true);
      expect(emitter.listeners.length).to.equal(0);
      expect(emitter.pop(listener)).to.equal(false);
    });

    it('should return false when listener is not present', () => {
      expect(emitter.pop(new EventListener('test', callback, null))).to.equal(false);
    });
  });
});



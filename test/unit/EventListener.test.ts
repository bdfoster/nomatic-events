import 'mocha';
import {expect} from 'chai';
import {EventListener} from '../../src';

describe('EventListener', () => {
  let listenerResult;
  const callback = (data) => {
    listenerResult = data;
  };
  beforeEach(function () {
    listenerResult = null;
  });

  describe('#constructor()', function () {
    it("should create a new EventListener object", function () {
      expect(new EventListener('test', callback, null)).to.have.keys([
        'namespace',
        'callback',
        'once',
        'emitter'
      ]);
    });
  });

  describe('#execute()', function () {
    it('should execute the callback', function () {
      new EventListener('test', callback, null).execute(this, true);
      expect(listenerResult).to.equal(true);
    });
  });

  describe("#close()", function () {
    it("should remove itself from `emitter`", function () {
      const listener = new EventListener('test', callback, null);
      listener.open();
      expect(listener.emitter.listeners.length).to.equal(1);
      listener.close();
      expect(listener.emitter.listeners.length).to.equal(0);
    })
  });

  describe("#open()", function () {
    it("should add itself back to `emitter` (EventEmitter)", function () {
      const listener = new EventListener('test', callback);
      listener.open(true);
      expect(listener.emitter.listeners.length).to.equal(1);
    });
  });

  describe("#once", function () {
    it("should only execute the listener once and remove itself from `emitter`", function () {
      const listener = new EventListener('test', callback, null);
      listener.execute(this, true);
      expect(listener.emitter.listeners.length).to.equal(0);
    });
  })
});

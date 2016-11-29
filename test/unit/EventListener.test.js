var expect = require('chai').expect;
var EventListener = require('../../').EventListener;
var beforeEach = require("mocha").beforeEach;
var it = require("mocha").it;
var describe = require("mocha").describe;

describe('EventListener', function() {
    var listener;
    var listenerResult;
    var callback;
    beforeEach(function() {
        callback = function(data) {
            listenerResult = data;
        };
        listener = new EventListener('test', callback);
    });

    describe('new', function() {
        it("should create a new EventListener object", function() {
            expect(listener).to.have.keys([
                'namespace',
                'callback',
                'once',
                'emitter'
            ])
        })
    });

    describe('#execute()', function() {
        it('should execute the callback given the event data', function() {
            listener.execute(this, true);
            expect(listenerResult).to.equal(true);
        })
    });

    describe("#close()", function() {
        it("should remove itself from `emitter` (EventEmitter)", function() {
            listener.close();
            expect(listener.emitter.listeners.length).to.equal(0);
        })
    });

    describe("#open()", function() {
        it("should add itself back to `emitter` (EventEmitter)", function() {
            listener.open(true);
            expect(listener.emitter.listeners.length).to.equal(1);
        });
    });

    describe("#once", function() {
        it("should only execute the listener once and remove itself from `emitter`", function() {
            listener.execute(this, true);
            expect(listener.emitter.listeners.length).to.equal(0);
        });
    })
});

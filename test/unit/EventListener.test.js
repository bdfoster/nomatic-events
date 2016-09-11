var expect = require('chai').expect;
var EventListener = require('../../dist/EventListener');
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

    describe('#execute', function() {
        it('should execute the callback given the event data', function() {
            listener.execute(true);
            expect(listenerResult).to.equal(true);
        })
    })
})
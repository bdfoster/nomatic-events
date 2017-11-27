import 'mocha';
import {expect} from 'chai';
import {AsyncEventEmitter} from '../../src';

describe('AsyncEventEmitter', () => {
    let listenerResult;
    let emitter: AsyncEventEmitter;
    const callback = (data) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                listenerResult = data - 1;
                resolve();
            }, 500);
        })
    };
    beforeEach(function () {
        listenerResult = null;
        emitter = new AsyncEventEmitter();
        emitter.on('test', callback);
        emitter.on('test', (data) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    expect(listenerResult).to.equal(data - 1);
                    listenerResult += 1;
                    resolve();
                }, 700);
            });
        });
    });
    describe('#emit()', () => {
        it('should execute Promise instance', () => {
            return emitter.emit('test', 12345678).then(() => {
                expect(listenerResult).to.equal(12345678);
            });
        });
    });
});
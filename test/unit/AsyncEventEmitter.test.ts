import 'mocha';
import {expect} from 'chai';
import {AsyncEventEmitter} from '../../src';
import * as fs from 'fs';

describe('AsyncEventEmitter', () => {
    let listenerResult;
    let emitter: AsyncEventEmitter;
    const callback = (data) => {
        return new Promise((resolve) => {
            fs.readdir(__dirname, () => {
                listenerResult = data;
                resolve();
            });
        })
    };
    beforeEach(function () {
        listenerResult = null;
        emitter = new AsyncEventEmitter();
        emitter.on('test', callback);
    });
    describe('#emit()', () => {
        it('should execute Promise instance', () => {
            return emitter.emit('test', 12345678).then(() => {
                expect(listenerResult).to.equal(12345678);
            });
        });
    });
});
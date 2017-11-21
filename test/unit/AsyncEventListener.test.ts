import 'mocha';
import {expect} from 'chai';
import {AsyncEventListener} from '../../src';
import * as fs from 'fs';

describe('AsyncEventListener', () => {
    let listenerResult;
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
    });
    describe('#execute()', () => {
        it('should return a Promise instance', () => {
            const promise = new AsyncEventListener('test', callback, null).execute(this, true);
            expect(promise).to.be.instanceOf(Promise);
        });
    });
});
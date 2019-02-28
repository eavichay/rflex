import assert from 'assert';
import { describe, beforeEach, it } from 'mocha';
import { toEventEmitter } from './toEventEmitter.js';

// const {toEventEmitter} = require('./toEventEmitter');
// const assert = require('assert');
// const {describe, beforeEach, it} = require('mocha');

describe('toEventEmitter', () => {
    /**
     * @type rflex.EventEmitter
     */
    let unit;

    beforeEach(() => {
        unit = {
            a: 'a',
            b: 'b'
        };
        toEventEmitter(unit);
    });

    it('dispatchEvent', (done) => {
        unit.addEventListener('test', (e) => {
            assert.strictEqual(e.data, '123');
            done();
        });
        unit.dispatchEvent({
            type: 'test',
            data: '123'
        });
    });

    it('addEventListener', () => {
        unit.addEventListener('hello', (e) => {
            assert.strictEqual(e.type, 'hello');
        });
        unit.dispatchEvent({
            type: 'hello'
        });
    });

    it('removeEventListener', () => {
        let count = 0;
        const assertion = (e) => {
            count++;
            if (count > 2) throw new Error('Callback should run only once');
            assert.strictEqual(e.type, 'hello');
        };
        unit.addEventListener('hello', assertion);
        unit.dispatchEvent({
            type: 'hello'
        });
        unit.dispatchEvent({
            type: 'hello'
        });
        unit.removeEventListener('hello', assertion);
        unit.dispatchEvent({
            type: 'hello'
        });
    });
});
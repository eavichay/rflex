import assert from 'assert';
import { describe, beforeEach, it } from 'mocha';
import { Collection} from './collection.js';

describe('collection', () => {

    /**
     * @type {rflex.Collection}
     */
    let unit;

    beforeEach(() => {
        unit = new Collection();
    });

    it('Should have length', () => {
        unit = new Collection(15);
        unit.fill('test');
        assert.strictEqual(unit.length, 15);
        unit.forEach(value => {
            assert.strictEqual(value, 'test');
        });
    });

    it('Collection::fromArray', () => {
        const arr = [1, 2, 3, 'test'];
        unit = Collection.fromArray(arr);
        for (let idx = 0; idx < arr.length; idx++) {
            assert.strictEqual(unit[idx], arr[idx]);
        }
        assert.strictEqual(unit.length, arr.length);
    });

    describe('methods', () => {
        it('pop', () => {
            unit.push(1);
            unit.push(2);
            unit.push(3);
            assert.strictEqual(unit.length, 3);
            const value = unit.pop();
            assert.strictEqual(value, 3);
            assert.strictEqual(unit.length, 2);
        });

        it('push', () => {
            unit.push(1);
            unit.push(2);
            assert.strictEqual(unit.length, 2);
            assert.strictEqual(unit[0], 1);
            assert.strictEqual(unit[1], 2);
        });

        it('notifies', () => {
            let compareTo = [];
            let expectedValue;
            let actualValue;
            Object.entries(Array.prototype).forEach(([fnName]) => {
                unit.addEventListener(fnName, (event) => {
                    assert.strictEqual(event.type, fnName);
                    assert.deepStrictEqual(event.data, [2, 3, 4, 5, 'text']);
                    assert.deepStrictEqual(actualValue, expectedValue);
                });
                expectedValue = compareTo[fnName](2, 3, 4, 5, 'text');
                actualValue = unit[fnName](2, 3, 4, 5, 'text');
            });
        });
    });
});
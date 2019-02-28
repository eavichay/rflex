const {toEventEmitter} = require('../core/toEventEmitter.js');

/**
 * @namespace rflex
 */

/**
 * @memberOf rflex
 * @mixes rflex.EventEmitter
 * @extends Array
 */
export class Collection extends Array {
    constructor (...args) {
        super(...args);
        toEventEmitter(this);
        Object.entries(Array.prototype).forEach(([fnName, fn]) => {
            Object.defineProperty(this, fnName, {
                writable: false,
                configurable: false,
                enumerable: false,
                value: function(...args) {
                    const value = fn.call(this, ...args);
                    Collection.prototype.notify.call(this, ...args);
                    return value;
                }
            })
        })
    }

    notify(type, data) {
        this.dispatchEvent({
            type,
            data
        });
    }

    /**
     *
     * @param {Array} arr
     */
    static fromArray(arr) {
        const collection = new Collection();
        arr.forEach((value, key) => {
            collection[key] = value;
        });
        return collection;
    }
}
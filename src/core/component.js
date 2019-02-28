import 'oculusx/dist/index.js';
import { Slim } from 'slim-js';

/**
 * @typedef ChangeDetectionDetails
 * @property {string} path
 * @property {string} key
 * @property {*} value
 * @memberOf rflex
 */

/**
 * @class Component
 * @extends Slim
 * @memberOf rflex
 *
 * @readonly {object} dataModel
 */
class Component extends Slim {
    constructor() {
        super();
        Object.defineProperty(this, 'dataModel', {
            enumerable: false,
            configurable: false,
            writable: false,
            value: {}
        });
    }

    /**
     * @param {Function} callback
     */
    watch(path) {
        const observer = (key, value) => {
            this.modelChanged({path, key, value});
        };
        oculusx.watch(this.dataModel, path, (value, key) => {
            observer(key, value)
        });
        return () => oculusx.unwatch(this.dataModel, path, observer);
    }

    /**
     * @abstract
     * @param {ChangeDetectionDetails} details
     */
    modelChanged(details) {
    }
}

module.exports = {
    Component
};
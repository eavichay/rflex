// @ts-check

/**
 * @module rflex
 */

/**
 * @typedef {Object<string, Function[]>} ListenersMap
 */


/**
 * @type {WeakMap<object, ListenersMap>}
 */
const eventMapping = new WeakMap();

/**
 * @interface rflex.EventEmitter
 * @memberof rflex
 */
const eventEmitterProto = {
  /**
   * @param {string} type 
   * @param {Function} callback 
   */
  addEventListener(type, callback) {
    let map = eventMapping.get(this);
    if (!map) {
      map = {};
      eventMapping.set(this, map);
    }
    map[type] = map[type] || [];
    map[type].push(callback);
  },
  
  /**
   * @param {string} type
   * @param {Function} callback
   */
  removeEventListener(type, callback) {
    const map = eventMapping.get(this);
    if (map) {
      const entries = map[type];
      if (entries) {
        const idx = entries.indexOf(callback);
        if (idx >= 0) {
          entries.splice(idx, 1);
        }
      }
    }
  },

  /**
   * 
   * @param {Event} event
   */
  dispatchEvent(event) {
    const map = eventMapping.get(this);
    if (map) {
      const entries = map[event.type];
      if (entries) {
        entries.forEach(fn => {
          fn.call(this, event);
        })
      }
    }
  }
};

/**
 * @param {object} target 
 */
export function toEventEmitter(target) {
  Object.entries(eventEmitterProto).forEach(([key, fn]) => {
    Object.defineProperty(target, key, {
      enumerable: false,
      writable: false,
      value: fn.bind(target)
    })
  });
}
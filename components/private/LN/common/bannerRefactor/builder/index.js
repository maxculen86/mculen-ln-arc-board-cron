/* eslint-disable no-underscore-dangle */

/**
 * The Builder pattern allows a client to construct a complex object
 * by specifying the type and content only. Construction details are
 * hidden from the client entirely.
 */

/**
 * The most common motivation for using Builder is to simplify client
 * code that creates complex objects
 */

import { getDimsFromSiteService } from '../utils';

function ConfigBuilder() {
    this._config = {};

    this.init = function(config) {
        this._config = {
            ...this.config,
            ...config
        };
    };

    this.changeSlotName = function(name) {
        const { slotName } = this.config;
        this._config = {
            ...this._config,
            slotName: slotName.replace(/[^/]+$/g, name)
        };
    };

    this.setDimensionsFromSiteService = function(config, slotGroup, slot) {
        this._config.dimensions =
            getDimsFromSiteService(config)(slotGroup)(slot) ||
            this._config.dimensions;
    };

    this.get = function() {
        return this._config;
    };
}

export default ConfigBuilder;

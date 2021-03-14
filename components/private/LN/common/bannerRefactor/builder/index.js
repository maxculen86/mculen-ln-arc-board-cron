/* eslint-disable no-underscore-dangle */

import { getDimsFromSiteService } from '../utils';

function ConfigBuilder() {
    this._config = {};

    this.init = function(config) {
        this._config = {
            ...this._config,
            ...config
        };
    };

    // TODO: revisar si es necesario un regex
    // TODO: ubicar donde es usada esta función
    this.changeSlotName = function(name) {
        const { slotName } = this._config;
        this._config = {
            ...this._config,
            slotName: slotName.replace(/[^/]+$/g, name)
        };
    };

    this.setCustomAdUnit = function(unit) {
        const { slotName } = this._config;

        const slotNameSections =
            slotName && slotName.split('/').filter(Boolean);

        const stringToReplace =
            (slotNameSections &&
                slotNameSections.length > 2 &&
                slotNameSections
                    .slice(1, slotNameSections.length - 1)
                    .join('/')) ||
            '';

        this._config = {
            ...this._config,
            slotName: slotName.replace(stringToReplace, unit)
        };
    };

    this.segmentAdUnit = function(section, device) {
        const { slotName } = this._config;

        const stringToReplace =
            (slotName &&
                slotName
                    .split('/')
                    .filter(Boolean)
                    .shift()) ||
            '';

        this._config = {
            ...this._config,
            slotName: slotName.replace(stringToReplace, `${section}_${device}`)
        };
    };

    this.setDimensionsFromSiteService = function(config, slotGroup, slot) {
        this._config.dimensions =
            getDimsFromSiteService(config)(slotGroup)(slot) ||
            this._config.dimensions;
    };

    this.get = function() {
        /** HARDCODED TEMPORARILY */
        if (
            this._config.slotId === 'cabezal_dsk' &&
            this._config.slotGroup === 'nota'
        ) {
            this._config.dimensions = [
                [
                    [1, 1],
                    [728, 90],
                    [920, 100],
                    [920, 170],
                    [970, 90],
                    [1260, 100],
                    [1260, 170]
                ],
                [
                    [920, 170],
                    [920, 100],
                    [970, 90],
                    [728, 90]
                ]
            ];
            this._config.sizemap = {
                breakpoints: [
                    [1260, 100],
                    [0, 0]
                ],
                refresh: true
            };
        } else if (
            this._config.slotId === 'cabezal_dsk' &&
            this._config.slotGroup === 'acumulado'
        ) {
            this._config.dimensions = [
                [
                    [1, 1],
                    [728, 90],
                    [920, 100],
                    [920, 170],
                    [970, 90],
                    [1260, 100],
                    [1260, 170]
                ],
                [
                    [920, 170],
                    [970, 90],
                    [728, 90]
                ]
            ];
            this._config.sizemap = {
                breakpoints: [
                    [1260, 100],
                    [0, 0]
                ],
                refresh: true
            };
        }

        /** END */

        return this._config;
    };
}

export default ConfigBuilder;

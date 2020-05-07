/* eslint-disable no-case-declarations */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useReducer, useEffect, createElement } from 'react';

import Sticky1Mob from './types/sticky1Mob';

import Default from './types';

import {
    STORY_TEMPLATE,
    ACCUM_TEMPLATE,
    CABEZAL_DSK,
    CAJA_1_DSK,
    STICKY_1_MOB,
    STICKY_2_MOB,
    MEGATOP_DSK,
    ADHESION_DSK,
    ADHESION_MOB
} from '../constants';

import withStickyFromPointToPoint from '../../decorators/withStickyFromPointToPoint';
import withAdhesion from '../../decorators/withAdhesion';

function getBannerForStoryTemplate(config) {
    const { slotId } = config;
    switch (slotId) {
        case STICKY_1_MOB:
            return <Sticky1Mob {...config} />;
        case CABEZAL_DSK:
            return createElement(
                withStickyFromPointToPoint(Default)('caja1_dsk'),
                {
                    ...config
                }
            );
        case ADHESION_MOB:
        case ADHESION_DSK:
            return createElement(withAdhesion(Default), {
                ...config,
                closeButton: true
            });
        case CAJA_1_DSK:
        case MEGATOP_DSK:
        default:
            return <Default {...config} />;
    }
}

function getBannerForAccumTemplate(config) {}

function reducer(state, action) {
    const {
        meta: { config }
    } = action;
    switch (action.type) {
        case ACCUM_TEMPLATE:
            return { ...state, ...getBannerForAccumTemplate(config) };
        case STORY_TEMPLATE:
            return { ...state, ...getBannerForStoryTemplate(config) };
        default:
            throw new Error();
    }
}

export default config => {
    const { slotGroup } = config;

    return props => {
        const [banner, dispatch] = useReducer(reducer, null);
        useEffect(() => {
            if (!banner) {
                switch (slotGroup) {
                    case STORY_TEMPLATE:
                        dispatch({ type: STORY_TEMPLATE, meta: { config } });
                        break;
                    case ACCUM_TEMPLATE:
                        dispatch({ type: ACCUM_TEMPLATE, meta: { config } });
                        break;
                    default:
                        break;
                }
            }
        }, [banner]);

        return banner;
    };
};

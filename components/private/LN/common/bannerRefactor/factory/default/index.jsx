/* eslint-disable no-case-declarations         */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useReducer, useEffect, createElement } from 'react';

import Sticky1Mob from './types/sticky1Mob';

import Default from './types';
import Megatop from './types/megatop';

import {
    STORY_TEMPLATE,
    ACCUM_TEMPLATE,
    ONE_X_ONE_DSK,
    CABEZAL_DSK,
    CAJA_1_DSK,
    CAJA_2_DSK,
    CAJA_3_DSK,
    INREAD_DSK,
    MIDDLE_1_DSK,
    MIDDLE_2_DSK,
    MIDDLE_3_DSK,
    MIDDLE_TEADS_DSK,
    STICKY_1_MOB,
    STICKY_2_MOB,
    MEGATOP_DSK,
    MEGATOP_MOB,
    ADHESION_DSK,
    ADHESION_MOB
} from '../constants';

import withStickyFromPointToPoint from '../../decorators/withStickyFromPointToPoint';
import withBondingToBottom from '../../decorators/withBondingToBottom';

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
            return createElement(withBondingToBottom(Default), {
                ...config,
                closeButton: true
            });
        case MEGATOP_MOB:
        case MEGATOP_DSK:
            return <Megatop {...config} />;
        case MIDDLE_TEADS_DSK:
        case ONE_X_ONE_DSK:
        case CAJA_1_DSK:
        case CAJA_2_DSK:
        case CAJA_3_DSK:
        case INREAD_DSK:
        case MIDDLE_1_DSK:
        case MIDDLE_2_DSK:
        case MIDDLE_3_DSK:
        case STICKY_2_MOB:
            return <Default {...config} />;
        default:
            return <></>;
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

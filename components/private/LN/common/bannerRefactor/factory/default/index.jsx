/* eslint-disable no-case-declarations         */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useReducer, useEffect, createElement } from 'react';

import Default from './types';
import Megatop from './types/megatop';
import Comercial from './types/comercial';

import WithSkeletonBannerWithoutHide from '../../withSkeletonBannerWithoutHide';

import {
    STORY_TEMPLATE,
    ACCUM_TEMPLATE,
    ONE_X_ONE_DSK,
    ONE_X_ONE_TAB,
    ONE_X_ONE_MOB,
    CABEZAL_DSK,
    CAJA_1_DSK,
    CAJA_2_DSK,
    CAJA_3_DSK,
    CAJA_4_DSK,
    CAJA_5_DSK,
    CAJA_1_TAB,
    CAJA_2_TAB,
    CAJA_1_MOB,
    CAJA_2_MOB,
    CAJA_3_MOB,
    CAJA_4_MOB,
    CAJA_5_MOB,
    INREAD_DSK,
    MIDDLE_1_DSK,
    MIDDLE_2_DSK,
    MIDDLE_3_DSK,
    MIDDLE_1_TAB,
    MIDDLE_2_TAB,
    MIDDLE_TEADS_DSK,
    CABEZAL_TAB,
    STICKY_1_MOB,
    STICKY_2_MOB,
    MEGATOP_DSK,
    MEGATOP_MOB,
    ADHESION_DSK,
    ADHESION_MOB,
    ADHESION_TAB,
    COMERCIAL_DSK,
    COMERCIAL_MOB
} from '../constants';

import withStickyFromPointToPoint from '../../decorators/withStickyFromPointToPoint';
import withBondingToBottom from '../../decorators/withBondingToBottom';
import withParagraphCondition from '../../decorators/withParagraphCondition';
import withNonSubscribersConstraint from '../../decorators/withNonSubscribersConstraint';
import withBondingToBottomMobile from '../../decorators/withBondingToBottomMobile';
import withCommentsEnabledConstraint from '../../decorators/withCommentsEnabledConstraint';
import withStickyMobile from '../../decorators/withStickyMobile';

// TODO: luego mover cada funcion inherente a cada template a su propio archivo aparte
function getBannerForStoryTemplate(config) {
    const { slotId } = config;
    switch (slotId) {
        case STICKY_1_MOB:
            return <Default {...config} />;
        case STICKY_2_MOB:
            return createElement(withStickyMobile(Default), { ...config });
        case CABEZAL_TAB:
            // Sin sticky
            return createElement(Default, { ...config });
        case CABEZAL_DSK:
            return createElement(
                withStickyFromPointToPoint(Default)([
                    '#header',
                    '.lay-sidebar'
                ]),
                {
                    ...config
                }
            );
        case ADHESION_TAB:
        case ADHESION_MOB:
            // Meterle comportamiento viejo de adhesion, va para los dos tab y mob
            return createElement(
                withNonSubscribersConstraint(
                    withBondingToBottomMobile(Default)
                ),
                {
                    ...config,
                    closeButton: true
                }
            );
        case ADHESION_DSK:
            return createElement(
                withNonSubscribersConstraint(withBondingToBottom(Default)),
                {
                    ...config,
                    closeButton: true
                }
            );
        case MEGATOP_MOB:
        case MEGATOP_DSK:
            return <Megatop {...config} />;
        case CAJA_2_TAB:
            return createElement(withParagraphCondition(Default)(4), {
                ...config
            });
        case MIDDLE_1_TAB:
            // Se dibuja después del tercer parrafo/elemento
            return createElement(
                withParagraphCondition(withNonSubscribersConstraint(Default))(
                    3
                ),
                { ...config }
            );
        case MIDDLE_2_TAB:
            // Se dibuja después del noveno parrafo/elemento
            return createElement(
                withParagraphCondition(withNonSubscribersConstraint(Default))(
                    9
                ),
                { ...config }
            );
        case CAJA_3_DSK:
            return createElement(withParagraphCondition(Default)(5), {
                ...config
            });
        case CAJA_4_DSK:
            return createElement(withParagraphCondition(Default)(5), {
                ...config
            });
        case CAJA_5_DSK:
            return createElement(withCommentsEnabledConstraint(Default), {
                ...config
            });
        case MIDDLE_1_DSK:
        case MIDDLE_2_DSK:
        case MIDDLE_3_DSK:
            return createElement(withNonSubscribersConstraint(Default), {
                ...config
            });
        case ONE_X_ONE_DSK:
        case ONE_X_ONE_TAB:
        case ONE_X_ONE_MOB:
            return createElement(withNonSubscribersConstraint(Default), {
                ...config
            });
        case CAJA_2_MOB:
            return createElement(withNonSubscribersConstraint(Default), {
                ...config
            });
        case COMERCIAL_DSK:
        case COMERCIAL_MOB:
            return <Comercial {...config} />;
        case MIDDLE_TEADS_DSK:
        case CAJA_1_DSK:
        case CAJA_2_DSK:
        case CAJA_1_TAB:
        case CAJA_1_MOB:
        case CAJA_3_MOB:
        case CAJA_4_MOB:
        case CAJA_5_MOB:
        case INREAD_DSK:
            return <Default {...config} />;
        default:
            return <></>;
    }
}

function getBannerForAccumTemplate(config) {
    const { slotId } = config;
    switch (slotId) {
        case STICKY_1_MOB:
            return <Default {...config} />;
        case STICKY_2_MOB:
            return createElement(withStickyMobile(Default), { ...config });
        case MEGATOP_MOB:
        case MEGATOP_DSK:
            return <Megatop {...config} />;
        case ADHESION_DSK:
        case ADHESION_TAB:
        case ADHESION_MOB:
            return createElement(
                withNonSubscribersConstraint(
                    withBondingToBottomMobile(Default)
                ),
                {
                    ...config,
                    closeButton: true
                }
            );
        case COMERCIAL_DSK:
        case COMERCIAL_MOB:
            return <Comercial {...config} />;
        case CABEZAL_DSK:
        case CABEZAL_TAB:
        case CAJA_1_DSK:
        case CAJA_2_DSK:
        case CAJA_3_DSK:
        case CAJA_4_DSK:
        case CAJA_1_TAB:
        case CAJA_2_TAB:
        case CAJA_1_MOB:
        case CAJA_2_MOB:
        case CAJA_3_MOB:
        case CAJA_4_MOB:
            return <Default {...config} />;
        default:
            return <></>;
    }
}

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
    const { slotGroup, slotId } = config || { slotGroup: null };

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

        return banner || <WithSkeletonBannerWithoutHide slotId={slotId} />;
    };
};

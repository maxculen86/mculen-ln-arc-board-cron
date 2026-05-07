import React from 'react';
import get from '../../../../private/common/utils/get';
import getOpeningMediaData from './helpers/getOpeningMediaData';
import { getTitleData } from './helpers/getTitleData';
import {
    DEFAULT_DIAGRAM,
    getOpeningComponent
} from './helpers/openingComponent';

function Opening({ globalContent = {}, layout = '', children = [] }) {
    const promoItems = get(globalContent, 'promo_items', {});
    const headlines = get(globalContent, 'headlines', {});
    const subheadline = get(globalContent, 'subheadlines.basic', '');

    const { title1, title2 } = getTitleData(headlines);

    const {
        src,
        srcset,
        sizes,
        width,
        height,
        altText,
        videoUrl,
        posterUrl,
        diagram = DEFAULT_DIAGRAM
    } = getOpeningMediaData(promoItems, title1);

    const sharedProps = {
        diagram,
        src,
        srcset,
        sizes,
        width,
        height,
        altText,
        videoUrl,
        posterUrl,
        globalContent,
        layout,
        title1,
        title2,
        subheadline
    };

    return (
        <>
            {getOpeningComponent(sharedProps)}
            {children}
        </>
    );
}

export default Opening;

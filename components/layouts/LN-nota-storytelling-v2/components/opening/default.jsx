import React from 'react';
import get from '../../../../private/common/utils/get';
import getOpeningMediaData from './helpers/getOpeningMediaData';
import { getTitleData } from './helpers/getTitleData';
import SignatureFeature from '../../../../features/LN-nota/signature/default';
import { place } from '../../../../private/common/utils/firmaHelper';
import DateAndReadingTime from '../../../../features/LN/common/dateAndReadingTime/default';
import Toolbar from '../../../../features/LN/DS-Toolbar/default';
import {
    DEFAULT_DIAGRAM,
    getOpeningComponent
} from './helpers/openingComponent';

function Opening({ globalContent = {}, layout = '' }) {
    const promoItems = get(globalContent, 'promo_items', {});
    const headlines = get(globalContent, 'headlines', {});
    const subheadline = get(globalContent, 'subheadlines.basic', '');

    const { title1, title2 } = getTitleData(headlines);

    const {
        pictureSources,
        imgDefaultUrl,
        altText,
        diagram = DEFAULT_DIAGRAM
    } = getOpeningMediaData(promoItems, title1);

    const sharedProps = {
        diagram,
        pictureSources,
        imgDefaultUrl,
        altText,
        globalContent,
        layout,
        title1,
        title2,
        subheadline
    };

    return (
        <>
            {getOpeningComponent(sharedProps)}
            <div className="flex flex-col ai-center jc-center mx-auto mt-6 w-full max-w-635 gap-40">
                <div className="flex flex-col ai-center gap-8">
                    <SignatureFeature
                        customFields={{
                            position: place.Top,
                            withAudio: false
                        }}
                    />
                    <DateAndReadingTime globalContent={globalContent} />
                </div>
                <Toolbar />
            </div>
        </>
    );
}

export default Opening;

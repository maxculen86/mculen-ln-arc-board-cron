import React from 'react';
import get from '../../../../private/common/utils/get';
import DsSignature from '../../../../features/LN/DS-Signature/default';
import ImageUI from '../../../../features/ui/ln/image/default';
import { place } from '../../../../private/common/utils/firmaHelper';
import getOpeningMediaData from './helpers/getOpeningMediaData';
import OpeningAddons from './components/OpeningAddons';
import OpeningTitles from './components/OpeningTitles';
import { getTitleData } from './helpers/getTitleData';

const DEFAULT_DIAGRAM = 'image-100-title-below';

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

    return (
        <section className="" data-diagram={diagram}>
            {imgDefaultUrl && (
                <div className="">
                    <ImageUI
                        alt={altText}
                        src={imgDefaultUrl}
                        className="com-image"
                        fetchPriority="high"
                        loading="eager"
                        sources={pictureSources}
                    />
                </div>
            )}
            <div className="">
                <OpeningAddons globalContent={globalContent} layout={layout} />
                <OpeningTitles title1={title1} title2={title2} />
                {subheadline && <p className="">{subheadline}</p>}
                <DsSignature
                    customFields={{
                        position: place.Top
                    }}
                    globalContent={globalContent}
                    ignoreDistributor
                    showDateTimeAndReadingTime
                    showPhoto={false}
                />
            </div>
        </section>
    );
}

export default Opening;

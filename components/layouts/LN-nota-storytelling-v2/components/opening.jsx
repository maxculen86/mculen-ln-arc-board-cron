import React from 'react';
import { Adaptableimage } from '@ln/common-ui-adaptableimage';
import getOpeningMediaData from '../helpers/getOpeningMediaData';

function Opening({
    globalContent: {
        promo_items: promoItems = {},
        headlines: { basic: headline = '' } = {},
        subheadlines: { basic: subheadline = '' } = {}
    } = {}
}) {
    const { pictureSources, imgDefaultUrl, altText, diagram } =
        getOpeningMediaData(promoItems, headline);

    return (
        <section>
            {imgDefaultUrl && (
                <Adaptableimage
                    alt={altText}
                    src={imgDefaultUrl}
                    className="com-image"
                    fetchPriority="high"
                    loading="eager"
                    sources={pictureSources}
                />
            )}
            {headline && <h1>{headline}</h1>}
            {subheadline && <p>{subheadline}</p>}
            {diagram && <p>{diagram}</p>}
        </section>
    );
}

export default Opening;

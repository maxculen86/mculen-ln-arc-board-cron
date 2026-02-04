import React from 'react';
import PropTypes from 'fusion:prop-types';
import { SITE_LANACION } from 'fusion:environment';
import SnippetRender from '../../../common/snippet/snippetRender';
import get from '../../../common/utils/get';
import addRelatedImage from '../../common/utils/addRelatedImage';
import {
    extractDataFromPromoItems,
    urlSchema
} from '../../common/utils/extractDataFromPromoItems';
import { addForwardSlash } from '../../common/utils/addForwardSlash';
import removeHtmlTags from '../../../common/utils/removeHtmlTags';

const findNextTextAfterPowerUp = (startIndex, elements = []) =>
    elements
        .slice(startIndex + 1)
        .find(
            element =>
                element?.type === 'text' &&
                typeof element.content === 'string' &&
                element.content.trim()
        )
        ?.content.trim() || '';

function SnippetHowTo({ globalContent }) {
    const {
        canonical_url: canonicalUrl = '',
        headlines = {},
        subheadlines = {},
        content_elements: contentElements = []
    } = globalContent || {};

    const { promo_items: promoItems } = addRelatedImage(globalContent);
    const { image } = extractDataFromPromoItems(promoItems);
    const hasValidImage = !!get(image, 'url', '');
    const noteTitle = get(headlines, 'basic', '');
    const noteDescription = get(subheadlines, 'basic', '');

    const steps = [];

    contentElements.forEach((element, elementIndex) => {
        if (
            element?.type === 'custom_embed' &&
            element?.subtype === 'custom-how-to'
        ) {
            const stepNumber = Number(get(element, 'embed.config.step'));
            const name = get(element, 'embed.config.title', '');
            if (!name) return;

            const textAfterPowerUp = findNextTextAfterPowerUp(
                elementIndex,
                contentElements
            );
            const text = removeHtmlTags(textAfterPowerUp);

            const url = `${addForwardSlash(
                `${SITE_LANACION}${canonicalUrl}`
            )}#step${stepNumber}`;

            steps.push({
                '@type': 'HowToStep',
                name,
                ...(text && { text }),
                url
            });
        }
    });

    const data = {
        '@context': urlSchema,
        '@type': 'HowTo',
        name: noteTitle,
        ...(noteDescription && { description: noteDescription }),
        ...(hasValidImage && {
            image: {
                '@type': 'ImageObject',
                url: image.url,
                width: image.width,
                height: image.height
            }
        }),
        ...(steps.length > 0 ? { step: steps } : {})
    };

    return <SnippetRender id="Schema_HowTo" data={data} />;
}

SnippetHowTo.propTypes = {
    siteProperties: PropTypes.shape({
        title: PropTypes.string
    }).isRequired,
    globalContent: PropTypes.shape({
        type: PropTypes.string,
        subtype: PropTypes.string,
        canonical_url: PropTypes.string,
        headlines: PropTypes.shape({
            basic: PropTypes.string,
            meta_title: PropTypes.string
        }),
        subheadlines: PropTypes.shape({
            basic: PropTypes.string
        }),
        content_elements: PropTypes.arrayOf(
            PropTypes.shape({
                type: PropTypes.string,
                subtype: PropTypes.string
            })
        )
    }).isRequired
};

export default SnippetHowTo;

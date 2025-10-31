import React from 'react';
import {
    shouldHighlightCustomVoice,
    showExtraClass,
    showSection,
    showSubheadText,
    validateVariant,
    validateSubhead
} from '../../_helper';
import isContentLabAt100 from '../../../../../chains/utils/isContentLabAt100';
import MarqueeHighlight from '../../../../LN-10-global/common/marqueeHighlight/default';
import get from '../../../../../private/common/utils/get';

const buildCardConfig = ({
    articleData,
    configData,
    authorData,
    mediaData,
    displayData
}) => {
    const { content: articleContent, transformed: transformedArticle } =
        articleData;

    const { chainData, appData, editorData, customFields } = configData;

    const { quantity: authorsQuantity, marqueeImg } = authorData;

    const { type: typeOfMedia, withMedia } = mediaData;

    const { searchableField } = displayData;

    const withSubhead = validateSubhead(
        get(chainData, 'config', {}),
        withMedia,
        customFields,
        get(editorData, 'variant', '')
    );
    const hasCustomVoice = shouldHighlightCustomVoice(
        articleContent,
        get(chainData, 'config', {})
    );

    const isContentLab = isContentLabAt100(
        get(chainData, 'chainId', ''),
        get(chainData, 'layout', ''),
        get(appData, 'renderables', [])
    );
    const finalCardSize = isContentLab
        ? '4xl'
        : get(chainData, 'config.cardSize');

    const finalVariant = validateVariant(
        get(editorData, 'variant', ''),
        authorsQuantity
    );
    const finalClassName = showExtraClass(
        typeOfMedia,
        get(chainData, 'config.className', ''),
        withMedia,
        get(chainData, 'config.extraClass', '')
    );

    const sectionContent = hasCustomVoice ? (
        <MarqueeHighlight />
    ) : (
        showSection({
            withSection: get(chainData, 'config.withSection', false),
            article: transformedArticle,
            authors: get(editorData, 'authors', []) || [],
            authorPhoto: marqueeImg
        })
    );

    const subheadContent = showSubheadText({
        description: get(editorData, 'description', ''),
        withSubhead,
        article: transformedArticle
    });

    const searchableFieldContent =
        get(appData, 'isHome', false) && searchableField({ imageId: '_id' });

    return {
        hasCustomVoice,
        finalCardSize,
        finalVariant,
        finalClassName,
        sectionContent,
        subheadContent,
        searchableFieldContent
    };
};

export default buildCardConfig;
